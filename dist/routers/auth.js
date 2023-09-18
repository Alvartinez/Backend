"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* import { changePassword, forgetPassword, LoginPersona } from "../controllers/auth"; */
const auth_1 = require("../controllers/auth");
const controlJWT_1 = require("../middleware/controlJWT");
const router = (0, express_1.Router)();
router.put("/changePassword", auth_1.changePassword, controlJWT_1.verifyAndRenewToken);
/* router.post("/forgetPassword", forgetPassword); */
router.post("/login", auth_1.LoginPersona, controlJWT_1.verifyAndRenewToken);
router.get("/getPeople", auth_1.getPeopleWithCourses);
exports.default = router;
