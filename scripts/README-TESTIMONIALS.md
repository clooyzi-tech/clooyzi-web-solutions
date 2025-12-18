# Testimonials Feature Setup

## Database Setup

**IMPORTANT:** Run this SQL in your Supabase SQL Editor:

```sql
-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Disable RLS (we use service role key for admin operations)
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;

-- Clear existing data if re-running
TRUNCATE TABLE testimonials RESTART IDENTITY CASCADE;

-- Insert default testimonials
INSERT INTO testimonials (quote, author, company, image) VALUES
('Hi Team, A big thank you to everyone for the fantastic work on Framyra website! The design, color combinations, and overall presentation are truly impressive. I appreciate your quick delivery and teamwork in bringing this to life. Special thanks to Nikhil for ensuring a great final output. Wishing your young, dynamic team continued success and many more creative projects ahead!', 'Jason', 'Framyra', '/clooyzi.png'),
('The cybersecurity services provided by Clooyzi have given us peace of mind. Their expertise in this field is unmatched.', 'Michael Chen', 'Global Retail Inc.', '/clooyzi.png'),
('Working with Clooyzi on our VR training program was a game-changer. The immersive experience they created has improved our training efficiency by 200%.', 'Emily Rodriguez', 'Education First', '/clooyzi.png');
```

## Features Added

### Admin Panel
- New "Testimonials" tab in admin dashboard
- Add/Edit/Delete testimonials
- Image upload (URL or file upload)
- Real-time preview

### Home Page
- Testimonials section now fetches from database
- Falls back to default 3 testimonials if database is empty
- Automatically updates when testimonials are added/edited

## Setup Steps

1. **Run the SQL script** in Supabase SQL Editor (copy from `testimonials-table-schema.sql`)
2. **Verify table created**: Check Supabase Table Editor for `testimonials` table
3. **Restart dev server**: Stop and restart `npm run dev`
4. **Login to admin**: Go to `/admin/login` (admin@clooyzi.com / admin123)
5. **Navigate to Testimonials tab** in dashboard
6. **Add/Edit/Delete testimonials**
7. **Check home page** - changes reflect immediately

## Troubleshooting

If you get 500 errors when adding testimonials:
- Ensure the SQL script ran successfully in Supabase
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
- Verify RLS is disabled on the `testimonials` table
- Check server console for detailed error messages
