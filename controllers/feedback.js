import { sendAdminFeedNoti } from "../utils/emailService.js";

export async function feedback(req, res) {
  try {
    const { location, rating, experience, email } = req.body;

    // Validate required fields
    if (!location || !rating || !experience || !email) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields. Please provide location, rating, experience, and email.",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate rating (should be a number between 1-5)
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5",
      });
    }

    const feedbackData = {
      location,
      rating: ratingNum, 
      experience,
      email,
    };

    // Send admin notification email
    const emailResult = await sendAdminFeedNoti(feedbackData);

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send notification email",
        error: emailResult.error,
      });
    }

    res.status(200).json({
      success: true,
      message: "Thank you for your feedback! We appreciate your input.",
    });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback. Please try again later.",
      error: error.message,
    });
  }
}
