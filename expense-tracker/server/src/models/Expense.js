import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    note: { type: String, trim: true, default: "" },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

ExpenseSchema.index({ date: 1 });
ExpenseSchema.index({ category: 1 });
ExpenseSchema.index({ note: "text", category: "text" });

export const Expense = mongoose.model("Expense", ExpenseSchema);
