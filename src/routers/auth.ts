import { Router } from "express";
/* import { changePassword, forgetPassword, LoginPersona } from "../controllers/auth"; */
import { changePassword, getPeopleWithCourses, LoginPersona } from "../controllers/auth";
import validateToken from "./validate-token";
import { verifyAndRenewToken } from "../middleware/controlJWT";

const router = Router();

router.put("/changePassword", changePassword, verifyAndRenewToken);
/* router.post("/forgetPassword", forgetPassword); */
router.post("/login", LoginPersona, verifyAndRenewToken);
router.get("/getPeople", getPeopleWithCourses);

export default router;