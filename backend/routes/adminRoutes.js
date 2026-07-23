const express = require("express");
const router = express.Router();
const { getNotifications, markAsRead } = require("../controllers/adminController");

router.get("/notifications", getNotifications);
router.patch("/notifications/:id/read", markAsRead);

module.exports = router;
