const db = require("../config/db");

module.exports = async function (req, res, next) {
  const result = await db.query(
    "SELECT * FROM subscriptions WHERE user_id=$1 AND status='active'",
    [req.user.id]
  );

  if (!result.rows.length)
    return res.status(403).json({ message: "No active subscription" });

  next();
};