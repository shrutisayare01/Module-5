import supabase from '../config/supabase.js';

export const createTodo = async (req, res) => {
  const { title } = req.body;

  const { error } = await supabase.from('todos').insert([
    { title, completed: false, userId: req.user.userId }
  ]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Todo created' });
};

export const getTodos = async (req, res) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('userId', req.user.userId);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const { data } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single();

  if (!data || data.userId !== req.user.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await supabase
    .from('todos')
    .update({ title, completed })
    .eq('id', id);

  res.json({ message: 'Todo updated' });
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const { data } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single();

  if (!data || data.userId !== req.user.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await supabase.from('todos').delete().eq('id', id);
  res.json({ message: 'Todo deleted' });
};