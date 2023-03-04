import express from "express";
import fs from "fs";
const transactionsRouter = express.Router();

transactionsRouter.get("/", (req,res) => {
  const data = JSON.parse(fs.readFileSync("./data/transactions.json"));
  res.json(data);

  if (req.query["sortAscending"] !== undefined) {
    
  }

});



export {transactionsRouter};