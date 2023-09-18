import { Router } from "express";
import { getQuiz } from "../controllers/quiz";
import { getResultsQuiz, resultadoQuiz } from "../controllers/responseQuiz";

const router = Router();

router.get("/quiz/:id", getQuiz);
router.post("/saveQuiz", resultadoQuiz);
router.get("/", getResultsQuiz);

export default router;