import { useEffect, useState } from "react";
import { deleteTransactionRequest } from "../../api/deleteTransaction";
import fetchCategories from "../../api/fetchCategories";
import fetchTransactions from "../../api/fetchTransactions";
import Button from "../../components/Button";
import CategoryType from "../../utils/types/CategoryType";
import TransactionType from "../../utils/types/TransactionType";
import CreateNewCategory from "../createCategory/CreateNewCategory";
import CreateNewTransaction from "../createTransaction/CreateNewTransaction";
import EditTransaction from "../editTransaction/EditTransaction";
import Statistics from "../statistics/Statistics";
import TransactionComponent from "../transaction/TransactionComponent";
import "./TransactionList.css";

function TransactionList() {
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [sort, setSort] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<boolean>(true);
  const [openCreateTransactionModal, setOpenCreateTransactionModal] =
    useState<boolean>(false);
  const [openEditTransactionModal, setOpenEditTransactionModal] =
    useState<boolean>(false);
  const [transactionToEdit, setTransactionToEdit] = useState<TransactionType>({
    id: 0,
    description: "",
    date: "",
    amount: 0,
    type: "",
    category: 0,
  });
  const [sumOfAllIncome, setSumOfAllIncome] = useState<number>(0);
  const [sumOfAllExpenses, setSumOfAllExpenses] = useState<number>(0);
  useEffect(() => {
    async function loadTransactionsData() {
      setTransactions(await fetchTransactions(sort));
    }
    loadTransactionsData();
  }, [sort]);

  useEffect(() => {
    async function loadCategoryData() {
      setCategories(await fetchCategories());
    }
    loadCategoryData();
  }, []);

  useEffect(() => {
    function calcSumOfAllIncome() {
      let sum = 0;

      sum = transactions.reduce((acc, transaction) => {
        if (transaction.type === "Income") {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);

      setSumOfAllIncome(sum);
    }
    calcSumOfAllIncome();
  }, [transactions]);

  useEffect(() => {
    function calcSumOfAllExpenses() {
      let sum = 0;

      sum = transactions.reduce((acc, transaction) => {
        if (transaction.type === "Expense") {
          return acc + transaction.amount * -1;
        }
        return acc;
      }, 0);

      setSumOfAllExpenses(sum);
    }
    calcSumOfAllExpenses();
  }, [transactions]);

  function handleClick(id: number) {
    setTransactionToEdit(
      transactions.find((transaction) => transaction.id === id)
    );
    setOpenEditTransactionModal(true);
  }

  function deleteTransaction(id: number) {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
    deleteTransactionRequest(id);
  }
  function getBackgroundColor(categoryId: number) {
    let category = categories.find((category) => category.id === categoryId);
    if (category !== undefined) {
      return category.color;
    } else {
      return "white";
    }
  }
  function handleSortClick(sortString: string) {
    setSortOrder(!sortOrder);
    setSort(sortString);
  }

  return (
    <div className="transactions">
      <Statistics
        sumOfAllIncome={sumOfAllIncome}
        sumOfAllExpenses={sumOfAllExpenses}
      />
      <div className="containerButtons">
        <Button
          name={"Create TransactionType"}
          className={"createTransaction"}
          onClick={() => setOpenCreateTransactionModal(true)}
        />
        <CreateNewCategory
          onSetCategories={setCategories}
          categories={categories}
        />
        <Button
          name={"sort by date"}
          className={"sortByDateButton"}
          onClick={() =>
            sortOrder
              ? handleSortClick("date-asc")
              : handleSortClick("date-desc")
          }
        ></Button>
        <Button
          name={"sort by amount"}
          className={"sortByAmountButton"}
          onClick={() =>
            sortOrder
              ? handleSortClick("amount-asc")
              : handleSortClick("amount-desc")
          }
        ></Button>
      </div>

      <div className="createTransaction">
        {openCreateTransactionModal && (
          <CreateNewTransaction
            headerText={"Create New TransactionType"}
            onSetTransactions={setTransactions}
            onCloseWindow={setOpenCreateTransactionModal}
            inputClassName={"input"}
            typeText={"text"}
            typeSelect={"select"}
            typeDatepicker={"datetime-local"}
            labelDescription={"Name of TransactionType"}
            labelDate={"When"}
            labelAmount={"Amount"}
            labelCategory={"CategoryType"}
            labelType={"Type"}
            transactions={transactions}
            categories={categories}
          />
        )}
      </div>
      {transactions.map((transaction) => {
        return (
          <div>
            <TransactionComponent
              colorOfCategory={getBackgroundColor(transaction.categoryId)}
              key={transaction.id}
              amount={transaction.amount}
              date={transaction.date}
              description={transaction.description}
              type={transaction.type}
              category={
                categories.find((category) => category.id === transaction.categoryId)
                  ?.name
              }
              onEditTransaction={() => handleClick(transaction.id)}
              onDeleteTransaction={() => deleteTransaction(transaction.id)}
            />
          </div>
        );
      })}

      <div className="editTransaction">
        {openEditTransactionModal && (
          <EditTransaction
            headerText={"Edit TransactionType"}
            inputClassName={"input"}
            typeText={"text"}
            typeSelect={"select"}
            typeDatepicker={"datetime-local"}
            labelDescription={"Name of TransactionType"}
            labelDate={"When"}
            labelAmount={"Amount"}
            labelCategory={"CategoryType"}
            labelType={"Type"}
            descriptionToEdit={transactionToEdit.description}
            amountToEdit={transactionToEdit.amount.toString()}
            dateToEdit={transactionToEdit.date}
            typeToEdit={transactionToEdit.type}
            categoryToEdit={
              categories.find(
                (category) => category.id === transactionToEdit.category
              )?.name
            }
            onCloseWindow={setOpenEditTransactionModal}
            onSetTransactions={setTransactions}
            transactions={transactions}
            id={transactionToEdit.id}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
}

export default TransactionList;
