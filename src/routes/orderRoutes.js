import express from "express";
import supabase from "../supabaseClient.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Place order (logged in user)
router.post("/", protect, async (req, res) => {
  const { menu_id, quantity } = req.body;
  const { data, error } = await supabase
    .from("orders")
    .insert([{ user_id: req.user.id, menu_id, quantity }])
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get my orders
router.get("/", protect, async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, menu(name, price)")
    .eq("user_id", req.user.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
