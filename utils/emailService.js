import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const sendBookingConfirmation = async (bookingData) => {
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
  } = bookingData;

  const kidAgesText = kid_ages ? ` (Ages: ${kid_ages})` : "";

  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: "Travel Dream",
    },
    subject: `🎉 Booking Confirmation - TravelDream Ceylon Journey`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .booking-details { background-color: white; padding: 15px; margin-top: 15px; border-left: 4px solid #4CAF50; border-radius: 4px; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Booking Confirmation</h1>
          </div>
          
          <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for choosing TravelDream Ceylon Journey! We have received your booking request and will contact you shortly to confirm the details.</p>
            
            <div class="booking-details">
              <h2 style="color: #4CAF50; margin-top: 0;">Your Booking Details</h2>
              
              <div class="detail-row">
                <span class="label">Guest Name:</span> ${name}
              </div>
              
              <div class="detail-row">
                <span class="label">Email:</span> ${email}
              </div>
              
              <div class="detail-row">
                <span class="label">Contact Number:</span> ${contact}
              </div>
              
              <div class="detail-row">
                <span class="label">Nationality:</span> ${nationality}
              </div>
              
              <div class="detail-row">
                <span class="label">Arrival Date:</span> ${formatDate(arrival)}
              </div>
              
              <div class="detail-row">
                <span class="label">Departure Date:</span> ${formatDate(
                  departure
                )}
              </div>
              
              <div class="detail-row">
                <span class="label">Number of Adults:</span> ${adults}
              </div>
              
              <div class="detail-row">
                <span class="label">Number of Kids:</span> ${kids}${kidAgesText}
              </div>
            </div>
            
            <p style="margin-top: 20px;">We look forward to welcoming you to Sri Lanka! Our team will reach out to you within 24 hours to finalize your itinerary.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br><strong>TravelDream Ceylon Journey Team</strong></p>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email.</p>
            <p>© ${new Date().getFullYear()} TravelDream Ceylon Journey. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Customer email sent successfully via SendGrid");
    return { success: true };
  } catch (error) {
    console.error("Error sending customer email:", error.message);
    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }
    return { success: false, error: error.message };
  }
};

export const sendAdminNotification = async (bookingData) => {
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
  } = bookingData;

  const kidAgesText = kid_ages ? ` (Ages: ${kid_ages})` : "";

  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: "TravelDream Booking System",
    },
    subject: `🔔 New Booking: ${name} - ${formatDate(arrival)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .booking-details { background-color: white; padding: 15px; margin-top: 15px; border-left: 4px solid #2196F3; border-radius: 4px; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; }
          .urgent { background-color: #fff3cd; padding: 10px; border-radius: 4px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Booking Received</h1>
          </div>
          
          <div class="content">
            <div class="urgent">
              <strong>⚡ Action Required:</strong> New booking received. Please contact the customer within 24 hours.
            </div>
            
            <div class="booking-details">
              <h2 style="color: #2196F3; margin-top: 0;">Booking Information</h2>
              
              <div class="detail-row">
                <span class="label">Guest Name:</span> ${name}
              </div>
              
              <div class="detail-row">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              
              <div class="detail-row">
                <span class="label">Contact Number:</span> <a href="tel:${contact}">${contact}</a>
              </div>
              
              <div class="detail-row">
                <span class="label">Nationality:</span> ${nationality}
              </div>
              
              <div class="detail-row">
                <span class="label">Arrival Date:</span> ${formatDate(arrival)}
              </div>
              
              <div class="detail-row">
                <span class="label">Departure Date:</span> ${formatDate(
                  departure
                )}
              </div>
              
              <div class="detail-row">
                <span class="label">Number of Adults:</span> ${adults}
              </div>
              
              <div class="detail-row">
                <span class="label">Number of Kids:</span> ${kids}${kidAgesText}
              </div>
              
              <div class="detail-row">
                <span class="label">Booking Received:</span> ${new Date().toLocaleString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Admin email sent successfully via SendGrid");
    return { success: true };
  } catch (error) {
    console.error("Error sending admin email:", error.message);
    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }
    return { success: false, error: error.message };
  }
};

export const sendAdminFeedNoti = async (feedbackData) => {
  const { location, rating, experience, email } = feedbackData;

  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: "TravelDream Feedback System",
    },
    subject: `⭐ New Travel Feedback: ${location} - ${rating}/5 stars`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #ff6b6b, #ee5a6f); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .rating { font-size: 24px; color: #ffa500; margin: 15px 0; }
          .location { font-size: 20px; font-weight: bold; color: #2c5aa0; margin-bottom: 15px; }
          .experience { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; }
          .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⭐ New Travel Feedback</h1>
            <p>TravelDream Ceylon Journey</p>
          </div>
          <div class="content">
            <div class="location">📍 ${location}</div>
            <div class="rating">${"⭐".repeat(
              parseInt(rating)
            )} (${rating}/5)</div>
            <h3>Travel Experience:</h3>
            <div class="experience">
              <p>${experience}</p>
            </div>
            ${
              email
                ? `<p style="margin-top: 20px;"><strong>From:</strong> <a href="mailto:${email}">${email}</a></p>`
                : ""
            }
          </div>
          <div class="footer">
            <p>Submitted on: ${new Date().toLocaleString()}</p>
            <p>TravelDream Feedback System</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Feedback email sent successfully via SendGrid");
    return { success: true };
  } catch (error) {
    console.error("Error sending feedback email:", error.message);
    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }
    return { success: false, error: error.message };
  }
};
