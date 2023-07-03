"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persona_1 = require("../controllers/persona");
const router = (0, express_1.Router)();
router.post("/", persona_1.newPersona);
router.post("/login", persona_1.LoginPersona);
exports.default = router;
