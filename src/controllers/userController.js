import { supabase } from '../config/supabaseClient.js';
import bcrypt from 'bcryptjs';

export const getMe = async (req, res) => {
  try {
    const { id } = req.user;
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, password } = req.body;
    const update = {};
    if (name) update.name = name;
    if (password) update.password = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .update(update)
      .eq('id', id)
      .select('id, name, email, role')
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};
