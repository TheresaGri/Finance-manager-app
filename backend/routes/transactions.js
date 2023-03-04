import express from "express";
import fs from "fs";

const transactionsRouter = express.Router();

transactionsRouter.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./data/transactions.json"));

  if (req.query["sortAscending"] !== undefined) {
    if (req.query["sortAscending"] === "date") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (req.query["sortAscending"] === "price") {
      data = data.sort((a, b) => {
        return a.amount - b.amount;
      });
    }
  }

  if (req.query.type === "expense") {
    data = data.filter((transaction) => transaction.type === "Expense");
  } else if (req.query.type === "income") {
    data = data.filter((transaction) => transaction.type === "Income");
  }

  if (req.query.category) {
    const categoryId = parseInt(req.query.category);
    data = data.filter((transaction) => transaction.categoryId === categoryId);
  }

  if (req.query.sortDescending === "date") {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (req.query.sortDescending === "amount") {
    data.sort((a, b) => b.amount - a.amount);
  }
  res.json(data);
});

export { transactionsRouter };
