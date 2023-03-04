import { useEffect, useState } from "react";
import { deleteTransactionRequest } from "../../api/deleteTransaction";
import fetchTransactions from "../../api/fetchTransactions";
import Button from "../../components/Button";
import Transaction from "../../types/Transaction";
import CreateNewCategory from "../createCategory/CreateNewCategory";
import CreateNewTransaction from "../createTransaction/CreateNewTransaction";
import TransactionComponent from "../transaction/TransactionComponent";
import "./TransactionList.css";

function TransactionList() {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [categories, setCategories] = useState<Array<Transaction>>([]);

  const [openCreateTransactionModal, setOpenCreateTransactionModal] =
    useState<boolean>(false);

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

  function createTransaction() {}

  function createCategory(id: number) {}

  return (
    <div className="transactions">
      <div className="containerButtons">
        <Button
          name={"Create Transaction"}
          className={"createTransaction"}
          onClick={() => setOpenCreateTransactionModal(true)}
        />
        <CreateNewCategory onCreateCategory={createCategory} />
      </div>

      <div className="createTransaction">
        {openCreateTransactionModal && (
          <CreateNewTransaction
          headerText={"Create New Transaction"}
          onSetTransactions={setTransactions}
          onCreateTransaction={createTransaction}
          onCloseWindow={setOpenCreateTransactionModal}
          inputClassName={"input"}
          typeText={"text"}
          typeSelect={"select"}
          typeDatepicker={"datetime-local"}
          labelDescription={"Name of Event"}
          labelDate={"When"}
          labelAmount={"Amount"}
          transactions={transactions}
          />
        )}
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
