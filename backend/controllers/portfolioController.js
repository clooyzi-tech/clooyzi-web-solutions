const supabase = require('../supabase');

// Fetch all works
exports.getWorks = async (req, res) => {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Add new work
exports.addWork = async (req, res) => {
  const { title, description, project_link } = req.body;

  if (!title || !description || !project_link) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const { data, error } = await supabase.from('portfolio').insert([
    {
      title,
      description,
      project_link,
      image_url: '',
    },
  ]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

// Delete work
exports.deleteWork = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from('portfolio').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted successfully' });
};
