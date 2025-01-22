import express, { Router } from "express";
import { index, create, remove, update } from "../controllers/financial-records";

const router: Router = express.Router();

router.get("/index/:userId", index);
router.post("/create", create);
router.put("/update/:recordId", update);

router.delete("/delete/:recordId", remove);

export default router;