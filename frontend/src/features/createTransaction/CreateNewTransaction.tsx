import { useEffect, useState } from "react";
import postTransaction from "../../api/postTransaction";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import CategoryType from "../../utils/types/CategoryType";
import TransactionType from "../../utils/types/TransactionType";
import "./CreateNewTransaction.css";

function CreateNewTransaction(props: {
  onSetTransactions: Function;
  onCloseWindow: Function;
  transactions: Array<TransactionType>;
  categories: Array<CategoryType>;
}) {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const onlyNumbers = new RegExp("^[-0-9]+$");
  const mandatoryFields =
    description.length > 0 &&
    onlyNumbers.test(amount) &&
    date.length > 0 &&
    type !== "";

  useEffect(() => {
    const isExpense = type === "Expense";
    if (isExpense) {
      setAmount("-" + amount);
    } else {
      setAmount(amount.replace("-", ""));
    }
  }, [type]);

  function createTransaction(): void {
    let categoryId: number | undefined = props.categories.find(
      (cat) => cat.name === category
    )?.id;
      console.log(categoryId)
    let newTransaction = {
      description: description,
      amount: amount === "" ? 0 : parseInt(amount),
      date: date,
      categoryId: categoryId,
      type: type,
    };
    props.onSetTransactions([...props.transactions, newTransaction]);
    postTransaction(newTransaction);

    props.onCloseWindow(false);
  }

  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <div className="title">
          <Header heading={"Create New Transaction"} />
        </div>
        <div className="body">
          <Label text={"Name of Transaction"} />
          <Input
            type={"text"}
            className={"input"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label text={"Amount"} />
          <Input
            className={"input"}
            type={"text"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Label text={"When"} />
          <Input
            type={"datetime-local"}
            className={"input"}
            onChange={(e) => setDate(e.target.value)}
          />
          <Label text={"Category"} />
          <Select
            values={props.categories.map((category) => category.name)}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Label text={"Type"} />
          <Select
            values={["", "Expense", "Income"]}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="footer">
          <Button
            name={"Save"}
            className={mandatoryFields ? "save" : "saveDisabled"}
            onClick={() => createTransaction()}
          />
          <Button
            name={"Cancel"}
            className={"cancel"}
            onClick={() => props.onCloseWindow(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateNewTransaction;
