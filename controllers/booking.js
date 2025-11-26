import {
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

    res.status(200).json({
      success: true,
      message:
        "Booking received successfully! We will contact you within 24 hours.",
      bookingId: `BK${Date.now()}`,
    });

    Promise.all([
      sendBookingConfirmation(bookingData),
      sendAdminNotification(bookingData),
    ]).catch(() => {});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process booking. Please try again later.",
    });
  }
}