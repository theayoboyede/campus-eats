import express from "express";
import supabase from "../supabaseClient.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create vendor (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase.from("vendors").insert([{ name }]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get vendors
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("vendors").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
