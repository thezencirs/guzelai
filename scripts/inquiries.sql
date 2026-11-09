CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  brand text NOT NULL,
  contact_email text NOT NULL,
  website text NOT NULL DEFAULT '',
  goal text NOT NULL,
  plan text NOT NULL,
  extras jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'new',
  ip_hash text NOT NULL
);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_ip_created_idx ON inquiries (ip_hash, created_at DESC);
