# Splachovačka - Project Structure

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.x |
| Runtime | React | 19.x |
| Database | Supabase (PostgreSQL) | - |
| Auth | Supabase Auth (optional) | - |
| Styling | Tailwind CSS | 3.4.x |
| Components | shadcn/ui | latest |
| Animations | Framer Motion | 11.x |
| Fingerprinting | FingerprintJS | 4.x |
| Hosting | Vercel | - |

## Directory Structure

```
splachovacka/
├── public/
│   ├── politicians/           # Caricature images (PNG/WebP)
│   │   ├── fico.png
│   │   ├── pellegrini.png
│   │   └── ...
│   ├── toilet/                # Toilet SVG states
│   │   ├── idle.svg
│   │   ├── hover.svg
│   │   ├── flushing.svg
│   │   └── disabled.svg
│   └── og-image.png           # Social sharing image
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (fonts, metadata)
│   │   ├── page.tsx           # Home - leaderboard + voting
│   │   ├── proxy.ts           # Rate limiting, fingerprint validation
│   │   ├── globals.css        # Tailwind imports
│   │   │
│   │   ├── api/
│   │   │   └── vote/
│   │   │       └── route.ts   # POST /api/vote - cast vote
│   │   │
│   │   ├── politik/
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Individual politician page
│   │   │
│   │   ├── rebricek/
│   │   │   └── page.tsx       # Full leaderboard
│   │   │
│   │   └── o-projekte/
│   │       └── page.tsx       # About, GDPR, anonymity info
│   │
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── toilet/
│   │   │   ├── toilet-button.tsx      # Main voting button (4 states)
│   │   │   ├── flush-animation.tsx    # Caricature swirl animation
│   │   │   └── vote-modal.tsx         # Confirmation modal
│   │   │
│   │   ├── politicians/
│   │   │   ├── politician-card.tsx    # Card with caricature + stats
│   │   │   ├── politician-grid.tsx    # Grid layout for mobile
│   │   │   └── leaderboard.tsx        # Ranked list view
│   │   │
│   │   └── layout/
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       └── mobile-nav.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      # Browser client
│   │   │   ├── server.ts      # Server client
│   │   │   └── admin.ts       # Service role client (for API routes)
│   │   │
│   │   ├── fingerprint.ts     # FingerprintJS wrapper
│   │   ├── database.types.ts  # Generated Supabase types
│   │   ├── utils.ts           # cn() helper, date utils
│   │   └── constants.ts       # App constants
│   │
│   ├── hooks/
│   │   ├── use-vote.ts        # Voting logic + optimistic UI
│   │   ├── use-fingerprint.ts # Fingerprint initialization
│   │   └── use-countdown.ts   # Time until next vote
│   │
│   └── types/
│       └── index.ts           # Shared TypeScript types
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   ├── seed.sql               # Initial politicians data
│   └── config.toml
│
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json            # shadcn/ui config
└── package.json
```

## Key Features

### Anonymous Voting Flow
1. User visits site → FingerprintJS generates `visitorId`
2. User selects politician → Vote modal opens
3. User confirms → API validates fingerprint hasn't voted today
4. Success → Flush animation plays, localStorage updated
5. Next day → Can vote again

### Toilet Button States
1. **idle** - Ready to vote, clickable
2. **hover** - Visual feedback on interaction
3. **flushing** - Animation playing after vote cast
4. **disabled** - Already voted today (shows countdown)

### Data Flow
```
Browser                          Server                    Database
   │                               │                          │
   ├─ FingerprintJS ──────────────►│                          │
   │  (get visitorId)              │                          │
   │                               │                          │
   ├─ POST /api/vote ─────────────►│                          │
   │  {fingerprint, politicianId}  │                          │
   │                               ├─ Check vote exists ─────►│
   │                               │  (fingerprint + today)   │
   │                               │◄─────────────────────────┤
   │                               │                          │
   │                               ├─ Insert vote ───────────►│
   │                               │  (if not exists)         │
   │◄──────────────────────────────┤                          │
   │  {success, newCount}          │                          │
```

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Optional: for extra fingerprint security
FINGERPRINT_SALT=random-string-here
```

## Mobile-First Breakpoints

```
sm: 640px   - Small tablets
md: 768px   - Tablets
lg: 1024px  - Desktop (future)
```

Default styles target mobile, then scale up.

## Getting Started

```bash
# Install dependencies
npm install

# Set up Supabase locally (optional)
npx supabase init
npx supabase start

# Generate types from database
npm run db:generate

# Start development
npm run dev
```
