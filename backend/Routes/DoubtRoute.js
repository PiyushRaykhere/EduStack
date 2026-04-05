import { Router } from "express"

import DoubtController from "../Controller/DoubtController.js"

const router = Router()

router.post("/ask", DoubtController.askDoubt)

export default router
