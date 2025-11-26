import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const VERIFIED_SENDER = {
  email: process.env.SENDGRID_FROM_EMAIL,
  name: "TravelDream Ceylon Journey",
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

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
    from: VERIFIED_SENDER,
    replyTo: ADMIN_EMAIL,
    subject: `🎉 Booking Confirmation - TravelDream Ceylon Journey`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white; 
            padding: 30px 20px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content { 
            padding: 30px 20px;
          }
          .booking-details { 
            background-color: #f9f9f9; 
            padding: 20px; 
            margin-top: 20px; 
            border-left: 4px solid #4CAF50; 
            border-radius: 4px;
          }
          .booking-details h2 {
            color: #4CAF50;
            margin-top: 0;
            font-size: 20px;
          }
          .detail-row { 
            padding: 10px 0; 
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label { 
            font-weight: 600; 
            color: #666;
            flex: 0 0 150px;
          }
          .value {
            flex: 1;
            text-align: right;
            color: #333;
          }
          .footer { 
            margin-top: 30px; 
            padding: 20px; 
            background-color: #f8f8f8;
            text-align: center; 
            color: #666; 
            font-size: 12px;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
          .highlight {
            background-color: #fff3cd;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">TravelDream Ceylon Journey</p>
          </div>
          
          <div class="content">
            <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
            
            <p>Thank you for choosing <strong>TravelDream Ceylon Journey</strong>! We have successfully received your booking request.</p>
            
            <div class="highlight">
              <strong>📞 What's Next?</strong><br>
              Our travel consultant will contact you within <strong>24 hours</strong> to confirm your itinerary and discuss your preferences.
            </div>
            
            <div class="booking-details">
              <h2>📋 Your Booking Details</h2>
              
              <div class="detail-row">
                <span class="label">Guest Name:</span>
                <span class="value">${name}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Contact Number:</span>
                <span class="value">${contact}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Nationality:</span>
                <span class="value">${nationality}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Arrival Date:</span>
                <span class="value">${formatDate(arrival)}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Departure Date:</span>
                <span class="value">${formatDate(departure)}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Adults:</span>
                <span class="value">${adults}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Children:</span>
                <span class="value">${kids}${kidAgesText}</span>
              </div>
            </div>
            
            <p style="margin-top: 25px;">We look forward to welcoming you to beautiful Sri Lanka! 🌴</p>
            
            <p>If you have any immediate questions, please don't hesitate to contact us.</p>
            
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>The TravelDream Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p><strong>TravelDream Ceylon Journey</strong></p>
            <p>Email: <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a></p>
            <p style="margin-top: 15px; font-size: 11px;">
              © ${new Date().getFullYear()} TravelDream Ceylon Journey. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
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
    to: ADMIN_EMAIL,
    from: VERIFIED_SENDER,
    replyTo: email,
    subject: `🔔 New Booking: ${name} - ${formatDate(arrival)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #2196F3, #1976D2);
            color: white; 
            padding: 30px 20px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content { 
            padding: 30px 20px;
          }
          .urgent { 
            background: linear-gradient(135deg, #ff9800, #f57c00);
            color: white;
            padding: 15px; 
            border-radius: 6px; 
            margin-bottom: 20px;
            font-weight: 600;
          }
          .booking-details { 
            background-color: #f9f9f9; 
            padding: 20px; 
            margin-top: 20px; 
            border-left: 4px solid #2196F3; 
            border-radius: 4px;
          }
          .booking-details h2 {
            color: #2196F3;
            margin-top: 0;
            font-size: 20px;
          }
          .detail-row { 
            padding: 10px 0; 
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label { 
            font-weight: 600; 
            color: #666;
            flex: 0 0 180px;
          }
          .value {
            flex: 1;
            text-align: right;
            color: #333;
          }
          .value a {
            color: #2196F3;
            text-decoration: none;
          }
          .value a:hover {
            text-decoration: underline;
          }
          .action-buttons {
            margin-top: 25px;
            text-align: center;
          }
          .action-buttons a {
            display: inline-block;
            padding: 12px 30px;
            margin: 0 10px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
          }
          .action-buttons a:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Booking Alert</h1>
            <p style="margin: 10px 0 0 0;">TravelDream Admin System</p>
          </div>
          
          <div class="content">
            <div class="urgent">
              ⚡ <strong>Action Required:</strong> New booking received! Please contact the customer within 24 hours.
            </div>
            
            <div class="booking-details">
              <h2>📋 Booking Information</h2>
              
              <div class="detail-row">
                <span class="label">Guest Name:</span>
                <span class="value"><strong>${name}</strong></span>
              </div>
              
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              
              <div class="detail-row">
                <span class="label">Contact Number:</span>
                <span class="value"><a href="tel:${contact}">${contact}</a></span>
              </div>
              
              <div class="detail-row">
                <span class="label">Nationality:</span>
                <span class="value">${nationality}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Arrival Date:</span>
                <span class="value"><strong>${formatDate(
                  arrival
                )}</strong></span>
              </div>
              
              <div class="detail-row">
                <span class="label">Departure Date:</span>
                <span class="value"><strong>${formatDate(
                  departure
                )}</strong></span>
              </div>
              
              <div class="detail-row">
                <span class="label">Number of Adults:</span>
                <span class="value">${adults}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Number of Children:</span>
                <span class="value">${kids}${kidAgesText}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Booking Received:</span>
                <span class="value">${new Date().toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</span>
              </div>
            </div>

            <div class="action-buttons">
              <a href="mailto:${email}">📧 Email Customer</a>
              <a href="tel:${contact}">📞 Call Customer</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const sendAdminFeedNoti = async (feedbackData) => {
  const { location, rating, experience, email } = feedbackData;

  const msg = {
    to: ADMIN_EMAIL,
    from: VERIFIED_SENDER,
    replyTo: email || ADMIN_EMAIL,
    subject: `⭐ New Travel Feedback: ${location} - ${rating}/5 stars`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 10px; 
            overflow: hidden; 
            box-shadow: 0 0 20px rgba(0,0,0,0.1); 
          }
          .header { 
            background: linear-gradient(135deg, #ff6b6b, #ee5a6f); 
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content { 
            padding: 30px; 
          }
          .rating { 
            font-size: 32px; 
            color: #ffa500; 
            margin: 20px 0;
            text-align: center;
          }
          .location { 
            font-size: 22px; 
            font-weight: bold; 
            color: #2c5aa0; 
            margin-bottom: 20px;
            text-align: center;
          }
          .experience { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #28a745;
            margin: 20px 0;
          }
          .experience h3 {
            margin-top: 0;
            color: #28a745;
          }
          .footer { 
            background: #f8f8f8; 
            padding: 20px; 
            text-align: center; 
            font-size: 12px; 
            color: #777; 
          }
          .user-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 6px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⭐ New Travel Feedback</h1>
            <p style="margin: 10px 0 0 0;">TravelDream Ceylon Journey</p>
          </div>
          <div class="content">
            <div class="location">📍 ${location}</div>
            <div class="rating">${"⭐".repeat(
              parseInt(rating)
            )} ${rating}/5</div>
            
            <div class="experience">
              <h3>💭 Customer Experience:</h3>
              <p style="margin: 0; font-size: 15px; line-height: 1.8;">${experience}</p>
            </div>
            
            ${
              email
                ? `
            <div class="user-info">
              <strong>📧 Submitted by:</strong> <a href="mailto:${email}" style="color: #2196F3; text-decoration: none;">${email}</a>
            </div>
            `
                : ""
            }
          </div>
          <div class="footer">
            <p><strong>Feedback Received:</strong> ${new Date().toLocaleString()}</p>
            <p>TravelDream Feedback System</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
