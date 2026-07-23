const mongoose = require("mongoose");

const AdminNotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminNotification", AdminNotificationSchema);
