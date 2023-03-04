import express from "express";
import fs from "fs";
const transactionsRouter = express.Router();

transactionsRouter.get("/", (req,res) => {
  const data = JSON.parse(fs.readFileSync("./data/transactions.json"));

  const filteredData = data.filter(transaction => transaction.amount < 0);

  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.data.year, a.data.month - 1, a.data.day);
    const dateB = new Date(b.data.year, b.data.month - 1, b.data.day);
    return dateB - dateA;
  });

  res.json(sortedData);
});


export {transactionsRouter};