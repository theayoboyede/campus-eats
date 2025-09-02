// Vendors routes 
const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const authMiddleware = require("../middleware/authMiddleware");

// Create vendor (admin only)
router.post("/", authMiddleware(["admin"]), async (req, res) => {
  const { name, description } = req.body;
  const { data, error } = await supabase.from("vendors").insert([{ name, description }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get all vendors
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("vendors").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Update vendor (admin only)
router.put("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { data, error } = await supabase.from("vendors").update({ name, description }).eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Delete vendor (admin only)
router.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("vendors").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Vendor deleted" });
});

module.exports = router;
