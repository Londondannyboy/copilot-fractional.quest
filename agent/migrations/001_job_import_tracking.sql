-- Migration: Add job and news import tracking
-- Run this against your Neon PostgreSQL database

-- ============================================
-- PART 1: Job Import Tracking
-- ============================================

-- Add import tracking columns to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS external_id TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS content_hash TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS imported_at TIMESTAMPTZ;

-- Indexes for fast deduplication lookups
CREATE INDEX IF NOT EXISTS idx_jobs_external_id ON jobs(source, external_id);
CREATE INDEX IF NOT EXISTS idx_jobs_content_hash ON jobs(content_hash);
CREATE INDEX IF NOT EXISTS idx_jobs_url ON jobs(url);

-- Import run history table for observability
CREATE TABLE IF NOT EXISTS job_import_runs (
    id SERIAL PRIMARY KEY,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    source TEXT NOT NULL,
    jobs_fetched INTEGER DEFAULT 0,
    jobs_filtered INTEGER DEFAULT 0,
    jobs_duplicates INTEGER DEFAULT 0,
    jobs_inserted INTEGER DEFAULT 0,
    status TEXT DEFAULT 'running',
    error_message TEXT,
    metadata JSONB DEFAULT '{}'
);

-- Index for querying recent runs
CREATE INDEX IF NOT EXISTS idx_job_import_runs_started ON job_import_runs(started_at DESC);


-- ============================================
-- PART 2: News/Articles Import
-- ============================================

-- Articles table for news content
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    source_name TEXT,
    published_date TEXT,  -- Store as text since Google News dates vary
    summary TEXT,
    key_insights TEXT[],
    category TEXT,  -- trends, hiring, opinion, case_study, market_report, other
    tags TEXT[],
    sentiment TEXT,  -- positive, neutral, negative
    image_url TEXT,
    content_hash TEXT,
    imported_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'published',  -- published, draft, archived
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for articles
CREATE INDEX IF NOT EXISTS idx_articles_content_hash ON articles(content_hash);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_imported ON articles(imported_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);


-- ============================================
-- PART 3: Unified Import Tracking
-- ============================================

-- Single table to track all import runs (jobs and news)
CREATE TABLE IF NOT EXISTS import_runs (
    id SERIAL PRIMARY KEY,
    import_type TEXT NOT NULL,  -- 'jobs', 'news', 'both'
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    items_fetched INTEGER DEFAULT 0,
    items_filtered INTEGER DEFAULT 0,
    items_duplicates INTEGER DEFAULT 0,
    items_inserted INTEGER DEFAULT 0,
    status TEXT DEFAULT 'running',
    error_message TEXT,
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_import_runs_started ON import_runs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_import_runs_type ON import_runs(import_type);
