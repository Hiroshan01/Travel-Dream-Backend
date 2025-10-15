import { sendAdminFeedNoti } from "../utils/emailService.js";

export async function feedback(req, res) {
  try {
    const { location, rating, experience, email } = req.body;

    if (!location || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    const feedbackData = {
      location,
      rating,
      experience,
      email,
    };

    // Send emails in parallel
    await Promise.all([sendAdminFeedNoti(feedbackData)]);
    res.status(200).json({
      success: true,
      message: "Thank you for your feedback! We appreciate your input.",
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback. Please try again later.",
      error: error.message,
    });
  }
}
