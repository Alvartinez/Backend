import { Router } from "express";
import { getPerson, LoginPersona, newPersona, deletePersona } from "../controllers/persona";
import validateToken from "./validate-token";

const router = Router();

router.get("/", getPerson);
router.post("/newUser", newPersona);
router.post("/loginUser", LoginPersona);
router.delete("/", deletePersona)

export default router;