import express from "express";
import { getAllEvents, createEvent, resgisterevent } from "../controller/EventController";
import { verifyToken, authorizeAdmin } from "../middleware/auth";
import {imageurl} from "../controller/imageurl"
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/allevents", getAllEvents);
router.post("/addevent", verifyToken, authorizeAdmin, createEvent);
router.post("/imageurl", verifyToken, authorizeAdmin,upload.single('image'), imageurl);
router.post("/register", verifyToken, resgisterevent);
export default router;
