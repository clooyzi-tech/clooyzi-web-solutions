-- Create advertisements table
CREATE TABLE IF NOT EXISTS advertisements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'other',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add constraint for valid categories
ALTER TABLE advertisements 
ADD CONSTRAINT valid_category 
CHECK (category IN ('tech', 'fashion', 'education', 'business', 'health', 'entertainment', 'other'));

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_advertisements_updated_at 
    BEFORE UPDATE ON advertisements 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO advertisements (title, description, image_url, link_url, category, is_active) VALUES
('Web Development Services', 'Professional web development services for your business', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'https://clooyzi.com/services', 'tech', true),
('Mobile App Development', 'Custom mobile applications for iOS and Android', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', 'https://clooyzi.com/mobile', 'tech', true),
('Fashion Store', 'Latest fashion trends and clothing', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', 'https://example.com/fashion', 'fashion', true),
('Online Education', 'Learn new skills with our online courses', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', 'https://example.com/education', 'education', false);