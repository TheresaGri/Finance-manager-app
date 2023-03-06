import express from "express";
import fs from "fs";
import { MongoClient } from "mongodb";

const transactionsRouter = express.Router();

async function establishConnection() {
  const client = await MongoClient.connect(
    "mongodb+srv://kenavm:EIBZDgkt7Ze2Y5jb@cluster0.ecks9tp.mongodb.net/financeApp?retryWrites=true&w=majority"
  );
  const db = client.db();

  return db;
}
const db = await establishConnection();
async function loadData() {
  const collection = db.collection("transactions");
  return await collection.find().toArray();
}

transactionsRouter.get("/", async (req, res) => {
  const data = await loadData();
  console.log(data);

  let categories = JSON.parse(fs.readFileSync("./data/categories.json"));

  if (req.query.sortAscending === "date") {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (req.query.sortAscending === "amount") {
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

  if (req.query.sortDescending === "date") {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (req.query.sortDescending === "amount") {
    data.sort((a, b) => b.amount - a.amount);
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

transactionsRouter.post("/", async (req, res) => {
  const newTransaction = req.body;
  let transactions = JSON.parse(fs.readFileSync("./data/transactions.json"));

  let maxId = 0;
  for (let transaction of transactions) {
    maxId = Math.max(maxId, transaction.id);
  }
  newTransaction.id = maxId + 1;
  transactions = [...transactions, newTransaction];
  const transactionsCollection = db.collection("transactions");
  await transactionsCollection.insertMany(transactions);
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

transactionsRouter.delete("/:id", async (req, res) => {
  console.log(req.params.id)
  const result = await db
    .collection("transactions")
    .deleteOne({ _id: ObjectId(req.params.id) });

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
