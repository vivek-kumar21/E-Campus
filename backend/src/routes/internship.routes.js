import { Router } from "express";
import {
  createInternship,
  deleteInternship,
  getAllInternships,
  getInternshipDetails,
  updateInternship,
} from "../controllers/internship.controller.js";

const router = Router();

router.route("/").get(getAllInternships);
router.route("/create").post(createInternship);
router.route("/:id").put(updateInternship);
router.route("/:id").delete(deleteInternship);
router.route("/:id").get(getInternshipDetails);

export default router;
