import express from "express";
import supabase from "../supabaseClient.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add menu item (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  const { vendor_id, name, price } = req.body;
  const { data, error } = await supabase
    .from("menu")
    .insert([{ vendor_id, name, price }])
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get all menu items
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
