import express from "express";
import { handlePaymentVerification } from "../controllers/accessController.js";

const router = express.Router();

router.post("/", handlePaymentVerification);

export default router;