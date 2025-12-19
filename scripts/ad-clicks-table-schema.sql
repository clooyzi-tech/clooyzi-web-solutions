-- Ad Clicks tracking table
CREATE TABLE IF NOT EXISTS ad_clicks (
    id SERIAL PRIMARY KEY,
    ad_id INTEGER NOT NULL REFERENCES advertisements(id) ON DELETE CASCADE,
    publisher_site VARCHAR(255),
    referrer_url TEXT,
    user_ip INET,
    user_agent TEXT,
    page_type VARCHAR(100),
    click_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ad_clicks_ad_id ON ad_clicks(ad_id);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_publisher_site ON ad_clicks(publisher_site);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_timestamp ON ad_clicks(click_timestamp);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_composite ON ad_clicks(ad_id, publisher_site, click_timestamp);