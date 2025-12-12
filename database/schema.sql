-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: news_articles
-- Used in: app/api/news/route.ts
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    image_url TEXT,
    source_name TEXT,
    category TEXT, -- 'Berita DBD Terbaru', 'Pencegahan DBD', etc.
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for news_articles (Optional, adjust policies as needed)
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to news
CREATE POLICY "Public articles are viewable by everyone" 
ON public.news_articles FOR SELECT 
USING (true);


-- Table: dengue_checks
-- Used in: lib/dengue-service.ts
CREATE TABLE IF NOT EXISTS public.dengue_checks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Nullable if anonymous
    
    -- Symptoms (Gejala)
    kdema TEXT, -- 'Iya' | 'Tidak'
    ddema NUMERIC,
    suhun NUMERIC,
    
    -- Lab Results
    ulabo TEXT, -- 'Sudah' | 'Belum'
    jwbcs NUMERIC,
    hemog NUMERIC,
    hemat NUMERIC,
    jplat NUMERIC,
    
    -- Additional Symptoms
    skpla TEXT,
    nymat TEXT,
    nysen TEXT,
    rsmul TEXT,
    hinfm TEXT,
    nyper TEXT,
    mumun TEXT,
    mdiar TEXT,
    
    -- Prediction Result
    prediction INTEGER, -- 0 | 1
    probability NUMERIC,
    model_used TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for dengue_checks
ALTER TABLE public.dengue_checks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see their own checks
CREATE POLICY "Users can view their own checks" 
ON public.dengue_checks FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can insert their own checks (or anonymous)
CREATE POLICY "Users can insert their own checks" 
ON public.dengue_checks FOR INSERT 
WITH CHECK (true); -- Modified to allow anonymous inserts implies simpler public insert, or auth.uid() check if strictly enforced. Code allows user_id to be null.

-- Policy: Users can delete their own checks
CREATE POLICY "Users can delete their own checks" 
ON public.dengue_checks FOR DELETE 
USING (auth.uid() = user_id);
