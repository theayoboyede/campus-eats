// Menu routes 
const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const authMiddleware = require("../middleware/authMiddleware");

// Create menu item (admin or vendor)
router.post("/", authMiddleware(["admin", "vendor"]), async (req, res) => {
  const { vendor_id, name, price } = req.body;
  const { data, error } = await supabase.from("menus").insert([{ vendor_id, name, price }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get menu items (optionally filter by vendor_id)
router.get("/", async (req, res) => {
  const { vendor_id } = req.query;
  let query = supabase.from("menus").select("*");

  if (vendor_id) query = query.eq("vendor_id", vendor_id);

  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Update menu item (admin or vendor)
router.put("/:id", authMiddleware(["admin", "vendor"]), async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const { data, error } = await supabase.from("menus").update({ name, price }).eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Delete menu item (admin or vendor)
router.delete("/:id", authMiddleware(["admin", "vendor"]), async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("menus").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Menu item deleted" });
});

module.exports = router;
