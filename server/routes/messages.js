import express from "express";

const router = express.Router();

// controllers
import { getInitialMessage, receiveMessage } from "../controllers/messages.js";

router.get("/initial-message", getInitialMessage);
router.post("/receive-message", receiveMessage);

export default router;
