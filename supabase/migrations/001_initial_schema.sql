-- Splachovačka Database Schema
-- Migration: 001_initial_schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Politicians table
CREATE TABLE politicians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  party TEXT,
  role TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for slug lookups
CREATE INDEX idx_politicians_slug ON politicians(slug);
CREATE INDEX idx_politicians_active ON politicians(is_active) WHERE is_active = true;

-- Anonymous votes table
CREATE TABLE anonymous_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fingerprint_hash TEXT NOT NULL,
  politician_id UUID NOT NULL REFERENCES politicians(id) ON DELETE CASCADE,
  voted_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One vote per fingerprint per day (regardless of politician)
  CONSTRAINT unique_daily_vote UNIQUE(fingerprint_hash, voted_at)
);

-- Create indexes for common queries
CREATE INDEX idx_votes_politician ON anonymous_votes(politician_id);
CREATE INDEX idx_votes_date ON anonymous_votes(voted_at);
CREATE INDEX idx_votes_fingerprint_date ON anonymous_votes(fingerprint_hash, voted_at);

-- Leaderboard view (all-time)
CREATE VIEW leaderboard AS
SELECT 
  p.id,
  p.name,
  p.slug,
  p.party,
  p.role,
  p.image_url,
  COUNT(v.id) as total_votes,
  COUNT(v.id) FILTER (WHERE v.voted_at = CURRENT_DATE) as today_votes,
  COUNT(v.id) FILTER (WHERE v.voted_at >= CURRENT_DATE - INTERVAL '7 days') as week_votes
FROM politicians p
LEFT JOIN anonymous_votes v ON p.id = v.politician_id
WHERE p.is_active = true
GROUP BY p.id
ORDER BY total_votes DESC;

-- Function to cast a vote (with validation)
CREATE OR REPLACE FUNCTION cast_anonymous_vote(
  p_fingerprint_hash TEXT,
  p_politician_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_existing_vote UUID;
  v_new_vote_id UUID;
  v_politician_name TEXT;
  v_new_total BIGINT;
BEGIN
  -- Check if fingerprint already voted today
  SELECT id INTO v_existing_vote
  FROM anonymous_votes
  WHERE fingerprint_hash = p_fingerprint_hash
    AND voted_at = CURRENT_DATE;
  
  IF v_existing_vote IS NOT NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'already_voted',
      'message', 'Dnes si už hlasoval. Vráť sa zajtra!'
    );
  END IF;
  
  -- Check if politician exists and is active
  SELECT name INTO v_politician_name
  FROM politicians
  WHERE id = p_politician_id AND is_active = true;
  
  IF v_politician_name IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'invalid_politician',
      'message', 'Tento politik neexistuje alebo bol deaktivovaný.'
    );
  END IF;
  
  -- Cast the vote
  INSERT INTO anonymous_votes (fingerprint_hash, politician_id)
  VALUES (p_fingerprint_hash, p_politician_id)
  RETURNING id INTO v_new_vote_id;
  
  -- Get new total
  SELECT COUNT(*) INTO v_new_total
  FROM anonymous_votes
  WHERE politician_id = p_politician_id;
  
  RETURN json_build_object(
    'success', true,
    'vote_id', v_new_vote_id,
    'politician_name', v_politician_name,
    'new_total', v_new_total
  );
END;
$$;

-- Function to check if fingerprint can vote today
CREATE OR REPLACE FUNCTION can_vote_today(p_fingerprint_hash TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_existing_vote RECORD;
BEGIN
  SELECT av.id, p.name as politician_name, p.slug
  INTO v_existing_vote
  FROM anonymous_votes av
  JOIN politicians p ON av.politician_id = p.id
  WHERE av.fingerprint_hash = p_fingerprint_hash
    AND av.voted_at = CURRENT_DATE;
  
  IF v_existing_vote IS NOT NULL THEN
    RETURN json_build_object(
      'can_vote', false,
      'voted_for', v_existing_vote.politician_name,
      'voted_for_slug', v_existing_vote.slug
    );
  END IF;
  
  RETURN json_build_object('can_vote', true);
END;
$$;

-- Row Level Security
ALTER TABLE politicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE anonymous_votes ENABLE ROW LEVEL SECURITY;

-- Politicians: Everyone can read active politicians
CREATE POLICY "Politicians are viewable by everyone"
  ON politicians FOR SELECT
  USING (is_active = true);

-- Votes: Only allow inserts through the RPC function
-- No direct SELECT on votes table (privacy)
CREATE POLICY "Votes are inserted via RPC only"
  ON anonymous_votes FOR INSERT
  WITH CHECK (false); -- Block direct inserts, use RPC

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON politicians TO anon, authenticated;
GRANT SELECT ON leaderboard TO anon, authenticated;
GRANT EXECUTE ON FUNCTION cast_anonymous_vote TO anon, authenticated;
GRANT EXECUTE ON FUNCTION can_vote_today TO anon, authenticated;

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER politicians_updated_at
  BEFORE UPDATE ON politicians
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
