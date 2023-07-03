import { Router } from "express";
import { getCurso } from "../controllers/curso";

const router = Router();

router.get("/", getCurso);

export default router;
