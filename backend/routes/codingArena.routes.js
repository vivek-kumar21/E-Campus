import { Router } from "express";
import { codeExecute } from "../controllers/codingArena.controller.js";

const router = Router();

router.route("/").post(codeExecute);

export default router;