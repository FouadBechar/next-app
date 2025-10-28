-- Migration: create contacts table
-- Run this on your Supabase/Postgres database

CREATE TABLE IF NOT EXISTS public.contacts (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  message TEXT,
  file_name TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- index to speed up lookups by email
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts (email);
