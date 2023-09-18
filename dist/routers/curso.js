"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const curso_1 = require("../controllers/curso");
const controlJWT_1 = require("../middleware/controlJWT");
const router = (0, express_1.Router)();
router.get("/", curso_1.getAllCourses, controlJWT_1.verifyAndRenewToken);
router.get("/Course/:id", curso_1.getCurso, controlJWT_1.verifyAndRenewToken);
exports.default = router;
