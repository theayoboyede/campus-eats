import supabase from "../supabaseClient.js";

export const getMenu = async (req, res) => {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const addMenuItem = async (req, res) => {
  const { vendor_id, item_name, price } = req.body;
  const { data, error } = await supabase
    .from("menu")
    .insert([{ vendor_id, item_name, price }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
