const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");
const subscription = require("../middleware/subscription");

const router = express.Router();

router.post("/create", auth, subscription, async (req, res) => {
  const { product_link, target_price } = req.body;

  await db.query(
    "INSERT INTO bot_jobs(user_id,product_link,target_price) VALUES($1,$2,$3)",
    [req.user.id, product_link, target_price]
  );

  res.json({ message: "Bot job created" });
});

module.exports = router;