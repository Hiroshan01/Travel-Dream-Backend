import express from "express";
import { booking } from "../controllers/booking.js";

const bookingRoute = express.Router();

bookingRoute.post("/", booking);

export default bookingRoute;
