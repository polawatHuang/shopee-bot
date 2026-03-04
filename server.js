require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const botRoutes = require("./routes/bot.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

// ✅ IMPORTANT FOR PLESK REVERSE PROXY
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static files
app.use(express.static(path.join(__dirname, "public")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/bot", botRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ✅ SPA fallback (สำคัญสำหรับ Plesk)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// ✅ MUST use process.env.PORT for Plesk
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});