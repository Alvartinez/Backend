import { Router } from "express";
import { getModule } from "../controllers/module";

const router = Router();

router.get("/module/:id", getModule);


export default router;