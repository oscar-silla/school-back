import express from "express";
const router = express.Router();
import example from "./controllers/example-controller";

router.use("/example", example);

export default router;
