import express from "express";
const router = express.Router();

router.get("/", (_req, _res) => {
  _res.send("Hello World");
});

export default router;
