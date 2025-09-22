import express from "express";
import { Expense } from "../models/Expense.js";

export const statsRouter = express.Router();

/**
 * GET /api/stats/summary
 * Returns { byCategory: [{_id: category, total}], byMonth: [{_id: 'YYYY-MM', total}] }
 */
statsRouter.get("/summary", async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const match = {};
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from);
      if (to) match.date.$lte = new Date(to);
    }

    const [byCategory, byMonth] = await Promise.all([
      Expense.aggregate([
        { $match: match },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $sort: { total: -1 } }
      ]),
      Expense.aggregate([
        { $match: match },
        { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$date" } }, total: { $sum: "$amount" } } },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({ data: { byCategory, byMonth } });
  } catch (err) {
    next(err);
  }
});
