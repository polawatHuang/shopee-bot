const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const result = await db.query(
    "INSERT INTO users(email,password) VALUES($1,$2) RETURNING id",
    [email, hash]
  );

  res.json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!user.rows.length)
    return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user.rows[0].id },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;