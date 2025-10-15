import express from "express";
import { feedback } from "../controllers/feedback.js";

const feedRbackRoute = express.Router();

feedRbackRoute.post("/", feedback);

export default feedRbackRoute;
