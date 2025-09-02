import { supabase } from '../config/supabaseClient.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'customer' } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email + password required' });

    // check existing
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (existing && existing.length) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashed, role }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      user: { id: data.id, name: data.name, email: data.email, role: data.role },
      token: generateToken(data.id, data.role)
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email + password required' });

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    const user = data && data[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user.id, user.role)
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || err });
  }
};
