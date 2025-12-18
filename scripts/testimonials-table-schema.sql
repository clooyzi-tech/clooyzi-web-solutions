-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Disable RLS for testimonials (using service role key)
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;

-- Alter existing table if already created
ALTER TABLE testimonials ALTER COLUMN image TYPE TEXT;

-- Clear existing data if re-running
TRUNCATE TABLE testimonials RESTART IDENTITY CASCADE;

-- Insert default testimonials
INSERT INTO testimonials (quote, author, company, image) VALUES
('Hi Team, A big thank you to everyone for the fantastic work on Framyra website! The design, color combinations, and overall presentation are truly impressive. I appreciate your quick delivery and teamwork in bringing this to life. Special thanks to Nikhil for ensuring a great final output. Wishing your young, dynamic team continued success and many more creative projects ahead!', 'Jason', 'Framyra', '/clooyzi.png'),
('The cybersecurity services provided by Clooyzi have given us peace of mind. Their expertise in this field is unmatched.', 'Michael Chen', 'Global Retail Inc.', '/clooyzi.png'),
('Working with Clooyzi on our VR training program was a game-changer. The immersive experience they created has improved our training efficiency by 200%.', 'Emily Rodriguez', 'Education First', '/clooyzi.png');
