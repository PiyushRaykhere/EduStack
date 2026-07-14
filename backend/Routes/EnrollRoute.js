import { Router } from "express";

import EnrollController from "../Controller/EnrollController.js";
import authMiddleware from "../Middleware/authMiddleware.js";


const router = Router();

router.get("/getEnrolls/:uid",EnrollController.getEnrolls);
router.post("/addNewEnroll",authMiddleware,EnrollController.createEnroll);





export default router