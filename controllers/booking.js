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

    // Validate required fields
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

    // Validate email format
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

    // IMPORTANT: Respond immediately - DON'T await emails
    res.status(200).json({
      success: true,
      message:
        "Booking received successfully! We will contact you within 24 hours.",
      bookingId: `BK${Date.now()}`,
    });

    // Send emails in background (fire and forget)
    // These will run after the response is sent
    Promise.all([
      sendBookingConfirmation(bookingData),
      sendAdminNotification(bookingData),
    ])
      .then(([customerResult, adminResult]) => {
        console.log("✅ Customer email:", customerResult);
        console.log("✅ Admin email:", adminResult);
      })
      .catch((error) => {
        // Email failure is logged but doesn't affect the booking
        console.error("⚠️ Email sending failed (non-critical):", error.message);
      });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process booking. Please try again later.",
    });
  }
}
