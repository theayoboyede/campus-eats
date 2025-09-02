// Orders routes 
const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const authMiddleware = require("../middleware/authMiddleware");

// Place order (user only)
router.post("/", authMiddleware(["user"]), async (req, res) => {
  const { menu_id, quantity } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from("orders")
    .insert([{ user_id, menu_id, quantity }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get all orders (admin only)
router.get("/", authMiddleware(["admin"]), async (req, res) => {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get my orders (user only)
router.get("/my", authMiddleware(["user"]), async (req, res) => {
  const user_id = req.user.id;
  const { data, error } = await supabase.from("orders").select("*").eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
