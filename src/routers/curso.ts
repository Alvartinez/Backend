import { Router } from "express";
import { getAllCourses, getCurso } from "../controllers/curso";
import { verifyAndRenewToken } from "../middleware/controlJWT";

const router = Router();

router.get("/", getAllCourses, verifyAndRenewToken);
router.get("/Course/:id", getCurso, verifyAndRenewToken);

export default router;
