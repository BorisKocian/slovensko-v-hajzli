-- Seed data for Splachovačka
-- Initial set of Slovak politicians (expand as needed)

INSERT INTO politicians (name, slug, party, role, image_url) VALUES
  -- Government
  ('Robert Fico', 'robert-fico', 'SMER-SD', 'Predseda vlády', '/politicians/fico.png'),
  ('Peter Pellegrini', 'peter-pellegrini', 'HLAS-SD', 'Prezident SR', '/politicians/pellegrini.png'),
  ('Robert Kaliňák', 'robert-kalinak', 'SMER-SD', 'Minister vnútra', '/politicians/kalinak.png'),
  ('Juraj Blanár', 'juraj-blanar', 'SMER-SD', 'Minister zahraničných vecí', '/politicians/blanar.png'),
  ('Tomáš Taraba', 'tomas-taraba', 'SNS', 'Minister životného prostredia', '/politicians/taraba.png'),
  ('Andrej Danko', 'andrej-danko', 'SNS', 'Predseda NR SR', '/politicians/danko.png'),
  ('Matúš Šutaj Eštok', 'matus-sutaj-estok', 'HLAS-SD', 'Minister vnútra', '/politicians/estok.png'),
  ('Boris Susko', 'boris-susko', 'SMER-SD', 'Minister spravodlivosti', '/politicians/susko.png'),
  ('Ladislav Kamenický', 'ladislav-kamenicky', 'SMER-SD', 'Minister financií', '/politicians/kamenicky.png'),
  ('Erik Tomáš', 'erik-tomas', 'HLAS-SD', 'Minister práce', '/politicians/tomas.png'),
  
  -- Opposition (for balance)
  ('Michal Šimečka', 'michal-simecka', 'PS', 'Predseda PS', '/politicians/simecka.png'),
  ('Igor Matovič', 'igor-matovic', 'OLANO', 'Poslanec', '/politicians/matovic.png'),
  ('Richard Sulík', 'richard-sulik', 'SaS', 'Predseda SaS', '/politicians/sulik.png'),
  ('Milan Mazurek', 'milan-mazurek', 'Republika', 'Poslanec', '/politicians/mazurek.png'),
  ('Ľuboš Blaha', 'lubos-blaha', 'SMER-SD', 'Poslanec', '/politicians/blaha.png')
ON CONFLICT (slug) DO NOTHING;

-- Note: Replace image URLs with actual paths once caricatures are ready
-- For development, you can use placeholder images
