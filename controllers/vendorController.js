// Vendor controller 
import supabase from "../supabaseClient.js";

export const getVendors = async (req, res) => {
  const { data, error } = await supabase.from("vendors").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const addVendor = async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase.from("vendors").insert([{ name }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
