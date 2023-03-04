import { useEffect, useState } from "react";
import { deleteTransactionRequest } from "../../api/deleteTransaction";
import fetchCategories from "../../api/fetchCategories";
import fetchTransactions from "../../api/fetchTransactions";
import Button from "../../components/Button";
import Category from "../../types/Category";
import Transaction from "../../types/Transaction";
import CreateNewCategory from "../createCategory/CreateNewCategory";
import CreateNewTransaction from "../createTransaction/CreateNewTransaction";
import TransactionComponent from "../transaction/TransactionComponent";
import "./TransactionList.css";

function TransactionList() {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);

  const [openCreateTransactionModal, setOpenCreateTransactionModal] =
    useState<boolean>(false);

  useEffect(() => {
    async function loadTransactionsData() {
      setTransactions(await fetchTransactions());
    }
    loadTransactionsData();
  }, []);

  useEffect(() => {
    async function loadCategoryData() {
      setCategories(await fetchCategories());
    }
    loadCategoryData();
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
          labelCategory={"Category"}
          labelType={"Type"}
          transactions={transactions}
          categories={categories.map(category => category.name)}
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
