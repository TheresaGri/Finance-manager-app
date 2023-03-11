import { useEffect, useState } from "react";
import patchTransaction from "../../api/patchTransaction";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import CategoryType from "../../utils/types/CategoryType";
import TransactionType from "../../utils/types/TransactionType";
import "./EditTransaction.css";

function editTransaction(props: {
  onSetTransactions: Function;
  onCloseWindow: Function;
  transactions: Array<TransactionType>;
  categories: Array<CategoryType>;
  id: number;
  descriptionToEdit: string;
  amountToEdit: string;
  dateToEdit: string;
  typeToEdit: string;
  categoryToEdit?: string;
}) {
  const [updatedDescription, setUpdatedDescription] = useState<string>(
    props.descriptionToEdit
  );
  const [updatedAmount, setUpdatedAmount] = useState<string>(
    props.amountToEdit
  );
  const [updatedDate, setUpdatedDate] = useState<string>(props.dateToEdit);
  const [updatedType, setUpdatedType] = useState<string>(props.typeToEdit);
  const [updatedCategory, setUpdatedCategory] = useState<string | undefined>(
    props.categoryToEdit
  );

  const onlyNumbers = new RegExp("^[-0-9]+$");
  const mandatoryFields =
    updatedDescription.length > 0 &&
    onlyNumbers.test(updatedAmount) &&
    updatedDate.length > 0 &&
    updatedType !== "";

  useEffect(() => {
    const isExpense = updatedType === "Expense";
    const isPositiveAmount = !updatedAmount.includes("-");

    let newAmount = updatedAmount;

    if (isExpense && isPositiveAmount) {
      newAmount = `-${newAmount}`;
    } else if (!isExpense) {
      newAmount = newAmount.replace("-", "");
    }

    setUpdatedAmount(newAmount);
  }, [updatedType]);

  function editTransaction(): void {
    let updatedAmountNumber = parseInt(updatedAmount);

    let newData = {
      id: props.id,
      amount: updatedAmountNumber,
      description: updatedDescription,
      date: updatedDate,
      type: updatedType,
      categoryId: props.categories.find(
        (category) => category.name === updatedCategory
      )?.id,
    };
    let transactionsUpdated = props.transactions.map((transaction) => {
      if (props.id === transaction.id) {
        return {
          ...transaction,
          ...newData,
        };
      } else {
        return transaction;
      }
    });
    props.onSetTransactions(transactionsUpdated);
    patchTransaction(newData, props.id);

    props.onCloseWindow(false);
  }

  return (
    <div>
      <div className="modalOverlay">
        <div className="modalContainer">
          <div className="title">
            <Header heading={"Edit Transaction"} />
          </div>
          <div className="body">
            <Label text={"Name of Transaction"} />
            <Input
              type={"text"}
              className={"input"}
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <Label text={"Amount"} />
            <Input
              className={"input"}
              type={"text"}
              value={updatedAmount}
              onChange={(e) => setUpdatedAmount(e.target.value)}
            />
            <Label text={"When"} />
            <Input
              type={"datetime-local"}
              className={"input"}
              onChange={(e) => setUpdatedDate(e.target.value)}
            />
            <Label text={"Category"} />
            <Select
              values={props.categories.map((category) => category.name)}
              value={updatedCategory!}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            />
            <Label text={"Type"} />
            <Select
              values={["", "Expense", "Income"]}
              value={updatedType}
              onChange={(e) => setUpdatedType(e.target.value)}
            />
          </div>
          <div className="footer">
            <Button
              name={"Save"}
              className={mandatoryFields ? "save" : "saveDisabled"}
              onClick={() => editTransaction()}
            />
            <Button
              name={"Cancel"}
              className={"cancel"}
              onClick={() => props.onCloseWindow(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default editTransaction;
