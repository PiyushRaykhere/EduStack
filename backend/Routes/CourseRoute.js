import { Router } from "express";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import CourseController from "../Controller/CourseController.js";

const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/:cid', CourseController.getCourses);
router.post('/', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);






export default router;