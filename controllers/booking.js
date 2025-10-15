import {
  sendAdminFeedNoti,
  sendAdminNotification,
  sendBookingConfirmation,
} from "../utils/emailService.js";

export async function booking(req, res) {
  try {
    const {
      name,
      email,
      contact,
      arrival,
      departure,
      adults,
      kids,
      kid_ages,
      nationality,
    } = req.body;

    if (
      !name ||
      !email ||
      !contact ||
      !arrival ||
      !departure ||
      !adults ||
      !nationality
    ) {
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
    const bookingData = {
      name,
      email,
      contact,
      arrival,
      departure,
      adults,
      kids: kids || 0,
      kid_ages: kid_ages || "",
      nationality,
    };

    // Send emails in parallel
    await Promise.all([
      sendBookingConfirmation(bookingData),
      sendAdminNotification(bookingData),
    ]);
    res.status(200).json({
      success: true,
      message:
        "Booking confirmed! Confirmation email sent to your email address.",
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process booking. Please try again later.",
      error: error.message,
    });
  }
}
