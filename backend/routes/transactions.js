import express from "express";
import fs from "fs";
const transactionsRouter = express.Router();

transactionsRouter.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/transactions.json"));
  const categories = JSON.parse(fs.readFileSync("./data.categories.json"));

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

  if (req.query["type"] !== undefined) {
      
  }
  res.json(data);
});

export { transactionsRouter };
