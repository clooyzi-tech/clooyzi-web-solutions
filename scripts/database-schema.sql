-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create works table
CREATE TABLE IF NOT EXISTS works (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  project_link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample works data
INSERT INTO works (title, description, image_url, project_link) VALUES
('Clooyzi.com', 'A modern tech solutions company offering software, video, and design services — crafted with Next.js & Tailwind.', '/clooyzi.png', 'https://clooyzi.com'),
('Framyra.com', 'Framyra — property management and hospitality, ensuring seamless care and elevated guest experiences.', '/framyra.png', 'https://framyra.com'),
('Sahasra Energy', 'A clean energy company website showcasing advanced renewable technology and green initiatives.', '/sahasra.png', 'https://sahasraenergy.com')
ON CONFLICT DO NOTHING;