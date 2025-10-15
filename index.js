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
app.use("/api/booking", bookingRoute);
app.use("/api/feedback", feedRbackRoute);
// app.use("/api/products", productRoute)
// app.use("/api/orders", orderRoute)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
