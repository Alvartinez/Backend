"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const curso_1 = require("../controllers/curso");
const router = (0, express_1.Router)();
router.get("/", curso_1.getCurso);
exports.default = router;
