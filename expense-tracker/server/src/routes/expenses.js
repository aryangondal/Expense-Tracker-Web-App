import express from "express";
import { Expense } from "../models/Expense.js";

export const expensesRouter = express.Router();

/**
 * GET /api/expenses
 * Query params:
 * - from, to: ISO date strings
 * - category: string
 * - q: search string (full-text on note/category)
 */
expensesRouter.get("/", async (req, res, next) => {
  try {
    const { from, to, category, q } = req.query;
    const filter = {};
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json({ data: expenses });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/expenses
 * Body: { amount, category, note?, date }
 */
expensesRouter.post("/", async (req, res, next) => {
  try {
    const { amount, category, note = "", date } = req.body;
    if (amount == null || !category || !date) {
      return res.status(400).json({ error: { message: "amount, category, date are required" } });
    }
    const expense = await Expense.create({ amount, category, note, date });
    res.status(201).json({ data: expense });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/expenses/:id
 */
expensesRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await Expense.findByIdAndUpdate(id, update, { new: true });
    if (!result) return res.status(404).json({ error: { message: "Expense not found" } });
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/expenses/:id
 */
expensesRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Expense.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: { message: "Expense not found" } });
    res.json({ data: { id } });
  } catch (err) {
    next(err);
  }
});
