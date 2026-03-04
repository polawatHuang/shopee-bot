const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const result = await db.query(
    `SELECT COUNT(*) total,
      SUM(CASE WHEN success=true THEN 1 ELSE 0 END) success
     FROM bot_jobs WHERE user_id=$1`,
    [req.user.id]
  );

  const total = Number(result.rows[0].total);
  const success = Number(result.rows[0].success) || 0;
  const percent = total ? ((success / total) * 100).toFixed(2) : 0;

  res.json({ total, success, percent });
});

module.exports = router;