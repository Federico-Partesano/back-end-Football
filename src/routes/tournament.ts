import express from "express";
import { tournamentController } from "../controllers/tournament";
const router = express.Router();
const { get } = tournamentController;

router.get("/", get);





export default router;
