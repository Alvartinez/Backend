"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const module_1 = require("../controllers/module");
const router = (0, express_1.Router)();
router.get("/module/:id", module_1.getModule);
exports.default = router;
