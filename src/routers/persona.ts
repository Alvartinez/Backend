import { Router } from "express";
import { getPerson, getPeople, newPersona, deletePersona, disabledPersona, enabledPersona } from "../controllers/persona";
import validateToken from "./validate-token";

const router = Router();

router.get("/", getPeople);
router.get("/User", getPerson);
router.post("/newUser", newPersona);
router.put("/disabledUser", disabledPersona);
router.put("/enabledUser", enabledPersona);
router.delete("/deleteUser", deletePersona);


export default router;