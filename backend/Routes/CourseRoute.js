import { Router } from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import CourseController from "../Controller/CourseController.js";

const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/:cid', CourseController.getCourses);
router.post('/', authMiddleware, adminMiddleware, CourseController.createCourse);
router.put('/:id', authMiddleware, adminMiddleware, CourseController.updateCourse);
router.delete('/:id', authMiddleware, adminMiddleware, CourseController.deleteCourse);






export default router;