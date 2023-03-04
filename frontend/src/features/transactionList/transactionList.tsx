import { useEffect, useState } from "react";
import { deleteTransactionRequest } from "../../api/deleteTransaction";
import fetchTransactions from "../../api/fetchTransactions";
import Transaction from "../../types/Transaction";
import CreateNewCategory from "../createCategory/CreateNewCategory";
import CreateNewTransaction from "../createTransaction/CreateNewTransaction";
import TransactionComponent from "../transaction/TransactionComponent";
import "./TransactionList.css";

function TransactionList() {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [categories, setCategories] = useState<Array<Transaction>>([]);

  useEffect(() => {
    async function loadEventsData() {
      setTransactions(await fetchTransactions());
    }
    loadEventsData();
  }, []);

  function handleClick(id: number) {}

  function deleteTransaction(id: number) {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
    deleteTransactionRequest(id);
  }

  function createTransaction(id: number) {}

  function createCategory(id: number) {}

  return (
    <div className="transactions">
      <div className="containerButtons">
        <CreateNewTransaction onCreateTransaction={createTransaction} />
        <CreateNewCategory onCreateCategory={createCategory} />
      </div>
      {transactions.map((transaction) => {
        return (
          <div>
            <TransactionComponent
              key={transaction.id}
              amount={transaction.amount}
              date={transaction.date}
              description={transaction.description}
              type={transaction.type}
              onEditTransaction={() => handleClick(transaction.id)}
              onDeleteTransaction={() => deleteTransaction(transaction.id)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TransactionList;
