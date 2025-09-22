import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    color: { type: String, default: "" } // optional for UI
  },
  { timestamps: true }
);

CategorySchema.index({ name: 1 }, { unique: true });

export const Category = mongoose.model("Category", CategorySchema);
