const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Replace with your actual Supabase credentials
const supabaseUrl = 'https://iiriampomcnmduoapxkp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcmlhbXBvbWNubWR1b2FweGtwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTgwMDc2NSwiZXhwIjoyMDgxMzc2NzY1fQ.0x9QdEu4MhARh7eOeeqyZFor43RDmqo7W1yxkaemIow';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Create admin user
    const adminEmail = 'admin@clooyzi.com';
    const adminPassword = 'admin123'; // Change this to a secure password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', adminEmail)
      .single();

    if (!existingAdmin) {
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          {
            email: adminEmail,
            password_hash: hashedPassword
          }
        ]);

      if (insertError) {
        console.error('Error creating admin user:', insertError);
      } else {
        console.log('Admin user created successfully!');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
      }
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database setup completed!');
  } catch (error) {
    console.error('Setup error:', error);
  }
}

setupDatabase();