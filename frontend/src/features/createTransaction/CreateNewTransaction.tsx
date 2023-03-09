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
  headerText: string;
  onSetTransactions: Function;
  onCloseWindow: Function;
  inputClassName: string;
  typeText: string;
  typeSelect: string;
  typeDatepicker: string;
  labelDescription: string;
  labelDate: string;
  labelAmount: string;
  labelCategory: string;
  labelType: string;
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
    if (type === "Expense") {
      setAmount("-" + amount);
    } else {
      setAmount(amount.replace("-", ""));
    }
  }, [type]);

  function createTransaction(): void {
    let categoryId: number | undefined = props.categories.find(
      (cat) => cat.name === category
    )?.id;

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
          <Header heading={props.headerText} />
        </div>
        <div className="body">
          <Label text={props.labelDescription} />
          <Input
            type={props.typeText}
            className={props.inputClassName}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label text={props.labelAmount} />
          <Input
            className={props.inputClassName}
            type={props.typeText}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Label text={props.labelDate} />
          <Input
            type={props.typeDatepicker}
            className={props.inputClassName}
            onChange={(e) => setDate(e.target.value)}
          />
          <Label text={props.labelCategory} />
          <Select
            values={props.categories.map((category) => category.name)}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Label text={props.labelType} />
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
