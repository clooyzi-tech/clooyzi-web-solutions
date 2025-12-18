# Admin Panel Setup Guide

## 1. Environment Setup

Update your `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## 2. Database Setup

### Option 1: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `scripts/database-schema.sql`
4. Run the SQL commands

### Option 2: Using the Setup Script
1. Update the credentials in `scripts/setup-admin.js`
2. Run: `node scripts/setup-admin.js`

## 3. Admin Credentials

Default admin credentials:
- **Email**: admin@clooyzi.com
- **Password**: admin123

**⚠️ Important**: Change the default password after first login!

## 4. Admin Panel Access

- **Login**: `/admin/login`
- **Dashboard**: `/admin/dashboard`

## 5. Features

### Admin Dashboard
- ✅ Secure JWT-based authentication
- ✅ Add new works with image, title, description, and live demo URL
- ✅ Edit existing works
- ✅ Delete works
- ✅ Responsive design matching site theme
- ✅ Real-time updates to frontend

### Frontend Integration
- ✅ Works section automatically fetches from database
- ✅ Maintains existing design and animations
- ✅ Shows "Live Demo" button instead of "Visit Website"

## 6. Database Schema

### admin_users table
- `id` (Primary Key)
- `email` (Unique)
- `password_hash`
- `created_at`

### works table
- `id` (Primary Key)
- `title`
- `description`
- `image_url`
- `project_link`
- `created_at`

## 7. Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Token expiration (24 hours)
- ✅ Input validation

## 8. Usage

1. Login at `/admin/login`
2. Access dashboard at `/admin/dashboard`
3. Add/edit/delete works
4. Changes appear immediately on the main website
5. Use "View Site" button to preview changes
6. Logout when done

## 9. Troubleshooting

- Ensure Supabase credentials are correct
- Check that database tables are created
- Verify admin user exists in database
- Check browser console for any errors