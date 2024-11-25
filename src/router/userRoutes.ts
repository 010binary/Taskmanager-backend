import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all users" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create a new user" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Get user with ID ${req.params.id}` });
});

export default router;
