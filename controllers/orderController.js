// Order controller 
import supabase from "../supabaseClient.js";

export const getOrders = async (req, res) => {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const placeOrder = async (req, res) => {
  const { user_id, menu_id, quantity } = req.body;
  const { data, error } = await supabase
    .from("orders")
    .insert([{ user_id, menu_id, quantity }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
