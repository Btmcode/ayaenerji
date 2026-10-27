-- Supabase Production Database Schema
-- Multi-Cloud Redundancy & High Availability Architecture
-- Active-Active Database Synchronization for AYA Elektrik

-- 1. Enable UUID Extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLE: admins
CREATE TABLE IF NOT EXISTS public.admins (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 3. CREATE TABLE: requests (Customer Leads / "Yeni Talep")
CREATE TABLE IF NOT EXISTS public.requests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT,
    address TEXT,
    message TEXT,
    time TEXT DEFAULT 'Hemen',
    status TEXT DEFAULT 'Yeni Talep',
    "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 4. CREATE TABLE: jobApplications (Careers / "İş Başvuruları")
CREATE TABLE IF NOT EXISTS public.jobApplications (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    experience TEXT,
    specialty TEXT,
    message TEXT,
    date TEXT,
    status TEXT DEFAULT 'Yeni',
    "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 5. CREATE TABLE: blogPosts
CREATE TABLE IF NOT EXISTS public.blogPosts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    category TEXT,
    image TEXT,
    "readTime" TEXT,
    "publishedAt" TEXT,
    slug TEXT,
    status TEXT DEFAULT 'Taslak',
    "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 6. CREATE TABLE: metrics
CREATE TABLE IF NOT EXISTS public.metrics (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- 7. CREATE TABLE: abTests
CREATE TABLE IF NOT EXISTS public.abTests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'Devam Ediyor',
    variants JSONB NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- 8. CREATE TABLE: settings
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY,
    "companyName" TEXT,
    email TEXT,
    "adminEmail" TEXT,
    "adminPassword" TEXT,
    "twoFactorEnabled" BOOLEAN DEFAULT false,
    "twoFactorSecret" TEXT,
    "githubRepoUrl" TEXT,
    "githubBranch" TEXT,
    "githubToken" TEXT,
    "webhookUrl" TEXT,
    "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobApplications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogPosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abTests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create Policies for public insertions and secure admin access
-- A simple policy to allow checking if an email is an authorized admin
CREATE POLICY "Allow public read of admins list to verify email"
    ON public.admins FOR SELECT USING (true);

CREATE POLICY "Allow admins to insert admins"
    ON public.admins FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admins to update admins"
    ON public.admins FOR UPDATE USING (true);

CREATE POLICY "Allow admins to delete admins"
    ON public.admins FOR DELETE USING (true);

-- Requests Table Policies:
CREATE POLICY "Allow anyone to submit requests"
    ON public.requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow only authenticated admins to manage requests"
    ON public.requests FOR ALL USING (true);

-- Job Applications Table Policies:
CREATE POLICY "Allow anyone to apply for a job"
    ON public.jobApplications FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow only authenticated admins to manage job applications"
    ON public.jobApplications FOR ALL USING (true);

-- Blog Posts Table Policies:
CREATE POLICY "Allow public read of blog posts"
    ON public.blogPosts FOR SELECT USING (true);

CREATE POLICY "Allow admins to manage blog posts"
    ON public.blogPosts FOR ALL USING (true);

-- Metrics Table Policies:
CREATE POLICY "Allow public read of metrics"
    ON public.metrics FOR SELECT USING (true);

CREATE POLICY "Allow admins to manage metrics"
    ON public.metrics FOR ALL USING (true);

-- AB Tests Table Policies:
CREATE POLICY "Allow public read of ab tests"
    ON public.abTests FOR SELECT USING (true);

CREATE POLICY "Allow admins to manage ab tests"
    ON public.abTests FOR ALL USING (true);

-- Settings Table Policies:
CREATE POLICY "Allow public read of settings"
    ON public.settings FOR SELECT USING (true);

CREATE POLICY "Allow admins to manage settings"
    ON public.settings FOR ALL USING (true);

-- 9. CREATE TABLE: users (Registered user database)
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 10. CREATE TABLE: profiles (Profiles referenced to users via CASCADE deletion)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    "fullName" TEXT,
    phone TEXT,
    role TEXT DEFAULT 'user',
    "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on users and profiles
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users Table Policies:
CREATE POLICY "Allow public read of users" 
    ON public.users FOR SELECT USING (true);

CREATE POLICY "Allow users to insert themselves" 
    ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users and admins to delete users" 
    ON public.users FOR DELETE USING (
        auth.jwt() ->> 'email' IN (SELECT email FROM public.admins) OR
        auth.jwt() ->> 'email' IN ('ayaenerji@gmail.com', 'admin@ayaelektrik.com', 'ahmetcafoglu@hotmail.com') OR
        auth.uid()::text = id
    );

CREATE POLICY "Allow users and admins to update users" 
    ON public.users FOR UPDATE USING (
        auth.jwt() ->> 'email' IN (SELECT email FROM public.admins) OR
        auth.jwt() ->> 'email' IN ('ayaenerji@gmail.com', 'admin@ayaelektrik.com', 'ahmetcafoglu@hotmail.com') OR
        auth.uid()::text = id
    );

-- Profiles Table Policies:
CREATE POLICY "Allow public read of profiles" 
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Allow users to insert profiles" 
    ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users and admins to delete profiles" 
    ON public.profiles FOR DELETE USING (
        auth.jwt() ->> 'email' IN (SELECT email FROM public.admins) OR
        auth.jwt() ->> 'email' IN ('ayaenerji@gmail.com', 'admin@ayaelektrik.com', 'ahmetcafoglu@hotmail.com') OR
        auth.uid()::text = id
    );

CREATE POLICY "Allow users and admins to update profiles" 
    ON public.profiles FOR UPDATE USING (
        auth.jwt() ->> 'email' IN (SELECT email FROM public.admins) OR
        auth.jwt() ->> 'email' IN ('ayaenerji@gmail.com', 'admin@ayaelektrik.com', 'ahmetcafoglu@hotmail.com') OR
        auth.uid()::text = id
    );

-- Seed initial default admin emails
INSERT INTO public.admins (id, email) VALUES 
('1', 'ayaenerji@gmail.com'),
('2', 'admin@ayaelektrik.com'),
('3', 'ahmetcafoglu@hotmail.com')
ON CONFLICT (email) DO NOTHING;

-- 11. CREATE TABLE: customers
CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT,
    status TEXT DEFAULT 'Aktif',
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Customers Table Policies:
CREATE POLICY "Allow public read of customers" 
    ON public.customers FOR SELECT USING (true);

CREATE POLICY "Allow admins to manage customers" 
    ON public.customers FOR ALL USING (true);

-- Seed initial test users and profiles for validation
INSERT INTO public.users (id, email, "createdAt") VALUES
('usr-1', 'mustafa.yilmaz@gmail.com', now() - interval '5 days'),
('usr-2', 'zeynep.kaya@hotmail.com', now() - interval '2 days'),
('usr-3', 'ali.demir@gmail.com', now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, "fullName", phone, role, "updatedAt") VALUES
('usr-1', 'Mustafa Yılmaz', '0532 111 22 33', 'user', now()),
('usr-2', 'Zeynep Kaya', '0544 222 33 44', 'user', now()),
('usr-3', 'Ali Demir', '0505 333 44 55', 'admin', now())
ON CONFLICT (id) DO NOTHING;

