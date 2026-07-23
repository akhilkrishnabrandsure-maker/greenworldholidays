const AdminNotification = require('../models/AdminNotification');

// @desc    Get all notifications
// @route   GET /api/admin/notifications
// @access  Private/Admin
const getNotifications = async (req, res) => {
  try {
    const notifications = await AdminNotification.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Mark notification as read
// @route   PATCH /api/admin/notifications/:id/read
// @access  Private/Admin
const markAsRead = async (req, res) => {
  try {
    const notification = await AdminNotification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true, runValidators: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead
};
