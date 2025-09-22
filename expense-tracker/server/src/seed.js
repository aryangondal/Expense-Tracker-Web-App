import dotenv from "dotenv";
import { connectDB } from "./src/db.js";
import { Expense } from "./src/models/Expense.js";
import { Category } from "./src/models/Category.js";

dotenv.config();

async function main() {
  await connectDB(process.env.MONGODB_URI);
  await Category.deleteMany({});
  await Expense.deleteMany({});

  const categories = ["Food", "Transport", "Utilities", "Entertainment", "Groceries"];
  await Category.insertMany(categories.map(name => ({ name })));

  const now = new Date();
  const monthsBack = 6;
  const docs = [];
  for (let m = 0; m < monthsBack; m++) {
    for (let i = 0; i < 20; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - m, Math.floor(Math.random() * 28) + 1);
      const cat = categories[Math.floor(Math.random() * categories.length)];
      const amount = Number((Math.random() * 50 + 5).toFixed(2));
      docs.push({ amount, category: cat, note: `Sample ${cat} expense`, date: d });
    }
  }
  await Expense.insertMany(docs);
  console.log(`Seeded ${docs.length} expenses`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
