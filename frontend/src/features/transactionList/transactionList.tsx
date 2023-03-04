import { useEffect, useState } from "react";
import fetchTransactions from "../../api/fetchTransactions";
import Transaction from "../../types/Transaction";
import TransactionComponent from "../transaction/TransactionComponent";

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

  function deleteTransaction(id: number) {}

  return (
    <div className="transactions">
      {transactions.map((transaction) => {
        return (
          <TransactionComponent
            key={transaction.id}
            amount={transaction.amount}
            hour={transaction.date.getHours()}
            minute={transaction.date.getMinutes()}
            category={transaction.category}
            editTransaction={() => handleClick(transaction.id)}
            deleteTransaction={() => deleteTransaction(transaction.id)}
          />
        );
      })}
    </div>
  );
}

export default TransactionList;
