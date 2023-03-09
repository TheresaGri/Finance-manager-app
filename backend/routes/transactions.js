import express from "express";
import fs from "fs";

const transactionsRouter = express.Router();

transactionsRouter.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./data/transactions.json"));
  let categories = JSON.parse(fs.readFileSync("./data/categories.json"));
  console.log(req.query.sortAscending)  
  if (req.query.sort === "date-asc") {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (req.query.sort === "amount-asc") {
    data.sort((a, b) => a.amount - b.amount);
  }

  if (req.query.type === "expense") {
    data = data.filter((transaction) => transaction.type === "Expense");
  } else if (req.query.type === "income") {
    data = data.filter((transaction) => transaction.type === "Income");
  }

  if (req.query["category"] !== undefined) {
    const categoryName = req.query["category"];
    const categoryWithName = categories.find(
      (category) => category.name === categoryName
    );

    if (categoryWithName) {
      const idOfCategory = categoryWithName.id;
      const transactionsInCategory = data.filter(
        (transaction) => transaction.categoryId === idOfCategory
      );
      data = transactionsInCategory;
    } else {
      data = data;
    }
  }

  if (req.query.sort === "date-desc") {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (req.query.sort === "amount-desc") {
    data.sort((a, b) => b.amount - a.amount);
  }

  if (req.query.offset !== undefined && req.query.limit !== undefined) {
    const offset = parseInt(req.query.offset) || 0; 
    const limit = parseInt(req.query.limit)  || 10 ;

    let slicedDate = data.slice(offset, offset + limit);
    data = slicedDate;
  }

  res.json(data);
});

transactionsRouter.get("/:id", (req, res) => {
  const transactions = JSON.parse(fs.readFileSync("./data/transactions.json"));
  const transactionId = transactions.find(
    (transaction) => transaction.id.toString() === req.params.id
  );
  res.json(transactionId);
});

transactionsRouter.post("/", (req, res) => {
  const newTransaction = req.body;
  let transactions = JSON.parse(fs.readFileSync("./data/transactions.json"));

  let maxId = 0;
  for (let transaction of transactions) {
    maxId = Math.max(maxId, transaction.id);
  }
  newTransaction.id = maxId + 1;
  transactions = [...transactions, newTransaction];
  fs.writeFileSync("./data/transactions.json", JSON.stringify(transactions));
  res.json({ status: "success" });
});

transactionsRouter.put("/:id", (req, res) => {
  let id = Number(req.params.id);
  const newTransaction = req.body;
  const transactions = JSON.parse(fs.readFileSync("./data/transactions.json"));
  const newTransactionIndex = transactions.findIndex(
    (transaction) => transaction.id === id
  );
  const transactionId = transactions[newTransactionIndex].id;
  transactions[newTransactionIndex] = { ...newTransaction, id: transactionId };
  fs.writeFileSync("./data/transactions.json", JSON.stringify(transactions));
});

transactionsRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const transactions = JSON.parse(fs.readFileSync("./data/transactions.json"));
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );
  fs.writeFileSync(
    "./data/transactions.json",
    JSON.stringify(filteredTransactions)
  );
});

transactionsRouter.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedTransaction = req.body;
  let transactions = JSON.parse(fs.readFileSync("./data/transactions.json"));

  const transactionIndex = transactions.findIndex(
    (transaction) => transaction.id === id
  );
  if (transactionIndex !== -1) {
    transactions[transactionIndex] = { ...updatedTransaction, id };
    fs.writeFileSync("./data/transactions.json", JSON.stringify(transactions));
    res.json({ status: "success" });
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});
export { transactionsRouter };
