console.log("Server running") 

const vendorRoutes = require("./routes/vendorRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/vendors", vendorRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/orders", orderRoutes);
