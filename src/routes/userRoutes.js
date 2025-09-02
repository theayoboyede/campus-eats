import express from "express";
import supabase from "../supabaseClient.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  const { data, error } = await supabase.from("users").select("id, email, role");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
