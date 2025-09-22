import express from "express";
import { Category } from "../models/Category.js";

export const categoriesRouter = express.Router();

/**
 * GET /api/categories
 */
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const cats = await Category.find({}).sort({ name: 1 });
    res.json({ data: cats });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/categories
 * Body: { name, color? }
 * Idempotent by name.
 */
categoriesRouter.post("/", async (req, res, next) => {
  try {
    const { name, color = "" } = req.body;
    if (!name) return res.status(400).json({ error: { message: "name is required" } });
    const existing = await Category.findOne({ name });
    if (existing) return res.json({ data: existing });
    const cat = await Category.create({ name, color });
    res.status(201).json({ data: cat });
  } catch (err) {
    next(err);
  }
});
