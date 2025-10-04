require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

/**
 * GET all portfolio projects
 */
app.get('/api/portfolio', async (req, res) => {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/**
 * POST new portfolio project
 */
app.post('/api/portfolio', upload.single('image'), async (req, res) => {
  const { title, description, project_link } = req.body;
  const imageFile = req.file;

  let image_url = '';

  if (imageFile) {
    const fileExt = path.extname(imageFile.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, imageFile.buffer, {
        contentType: imageFile.mimetype,
      });

    if (uploadError) return res.status(500).json({ error: uploadError.message });

    const { data: publicURL } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    image_url = publicURL.publicUrl;
  }

  const { error: insertError } = await supabase.from('portfolio').insert([
    { title, description, project_link, image_url },
  ]);

  if (insertError) return res.status(500).json({ error: insertError.message });
  res.status(200).json({ message: 'Project added' });
});

/**
 * DELETE project by ID
 */
app.delete('/api/portfolio/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('portfolio').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: 'Deleted' });
});

/**
 * PUT (update) project by ID
 */
app.put('/api/portfolio/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, description, project_link } = req.body;
  const imageFile = req.file;

  let updateData = { title, description, project_link };

  if (imageFile) {
    const fileExt = path.extname(imageFile.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, imageFile.buffer, {
        contentType: imageFile.mimetype,
      });

    if (uploadError) return res.status(500).json({ error: uploadError.message });

    const { data: publicURL } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    updateData.image_url = publicURL.publicUrl;
  }

  const { error: updateError } = await supabase
    .from('portfolio')
    .update(updateData)
    .eq('id', id);

  if (updateError) return res.status(500).json({ error: updateError.message });
  res.status(200).json({ message: 'Project updated' });
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Fetch matching email from DB
    const { data, error } = await supabase
      .from('adminlogin')
      .select('email, password')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password match
    if (data.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Success
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Start server
 */
app.listen(4000, () => {
  console.log('✅ Server running at http://localhost:4000');
});
