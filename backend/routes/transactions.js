import express from "express";
const transactionsRouter = express.Router();

transactionsRouter.get("/", (req,res) => {
  res.send("hi");
});

export {transactionsRouter};