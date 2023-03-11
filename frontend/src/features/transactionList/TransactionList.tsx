import { useEffect, useState } from "react";
import { deleteTransactionRequest } from "../../api/deleteTransaction";
import fetchCategories from "../../api/fetchCategories";
import fetchTransactions from "../../api/fetchTransactions";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import CategoryType from "../../utils/types/CategoryType";
import TransactionType from "../../utils/types/TransactionType";
import CreateNewCategory from "../createCategory/CreateNewCategory";
import CreateNewTransaction from "../createTransaction/CreateNewTransaction";
import EditTransaction from "../editTransaction/EditTransaction";
import Statistics from "../statistics/Statistics";
import TransactionComponent from "../transaction/TransactionComponent";
import PieChart from "../pieChart/PieChart";
import "./TransactionList.css";

const TRANSACTIONS_PER_PAGE = 5;

function TransactionList() {
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [openCreateTransactionModal, setOpenCreateTransactionModal] =
    useState(false);
  const [openEditTransactionModal, setOpenEditTransactionModal] =
    useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<TransactionType>({
    id: 0,
    description: "",
    date: "",
    amount: 0,
    type: "",
    categoryId: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastTransaction = currentPage * TRANSACTIONS_PER_PAGE;
  const indexOfFirstTransaction =
    indexOfLastTransaction - TRANSACTIONS_PER_PAGE;
  const currentTransaction: Array<TransactionType> = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  const sumOfAllIncome = transactions.reduce((acc, transaction) => {
    if (transaction.type === "Income") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const sumOfAllExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === "Expense") {
      return acc + transaction.amount * -1;
    }
    return acc;
  }, 0);


  function handleEditClick(id: number) {
    setTransactionToEdit(
      transactions.find((transaction) => transaction.id === id)!
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
      <div className="header-overview">
        <Statistics
          sumOfAllIncome={sumOfAllIncome}
          sumOfAllExpenses={sumOfAllExpenses}
        />
        <PieChart></PieChart>
      </div>
      <div className="containerButtons">
        <Button
          name={"Create Transaction"}
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
            onSetTransactions={setTransactions}
            onCloseWindow={setOpenCreateTransactionModal}
            transactions={transactions}
            categories={categories}
          />
        )}
      </div>
      {currentTransaction.map((transaction) => {
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
                categories.find(
                  (category) => category.id === transaction.categoryId
                )?.name
              }
              onEditTransaction={() => handleEditClick(transaction.id)}
              onDeleteTransaction={() => deleteTransaction(transaction.id)}
            />
          </div>
        );
      })}

      <div className="editTransaction">
        {openEditTransactionModal && (
          <EditTransaction
            headerText={"Edit Transaction"}
            inputClassName={"input"}
            typeText={"text"}
            typeSelect={"select"}
            typeDatepicker={"datetime-local"}
            labelDescription={"Name of Transaction"}
            labelDate={"When"}
            labelAmount={"Amount"}
            labelCategory={"Category"}
            labelType={"Type"}
            descriptionToEdit={transactionToEdit.description}
            amountToEdit={transactionToEdit.amount.toString()}
            dateToEdit={transactionToEdit.date}
            typeToEdit={transactionToEdit.type}
            categoryToEdit={
              categories.find(
                (category) => category.id === transactionToEdit.categoryId
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
      <div className="pagination">
        <Pagination
          transactionsPerPage={TRANSACTIONS_PER_PAGE}
          totalTransactions={transactions.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default TransactionList;
