import express from "express";

import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoute from "./routes/bookingRouter.js";
import feedRbackRoute from "./routes/feedbackRouter.js";

dotenv.config();

let app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT middleware

//Routers
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/api/booking", bookingRoute);
app.use("/api/feedback", feedRbackRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
