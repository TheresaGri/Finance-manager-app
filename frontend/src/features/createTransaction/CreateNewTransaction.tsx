import { useState } from "react";
import postTransaction from "../../api/postTransaction";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";
import Category from "../../types/Category";
import Transaction from "../../types/Transaction";
import "./CreateNewTransaction.css";

function CreateNewTransaction(props: {
  headerText: string;
  onSetTransactions: Function;
  onCreateTransaction: Function;
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
  transactions: Array<Transaction>;
  categories: Array<Category>;
}) {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  function createTransaction():void {
    
    let foundCategory:Category | undefined = props.categories.find(cat => cat.name === category)

    console.log(foundCategory)
    let newTransaction = {
      description: description,
      amount:parseInt(amount),
      date:date,
      categoryId:foundCategory?.id,
      type:type
    }
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
            values={props.categories.map(category => category.name)}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Label text={props.labelType} />
          <Select
            values={["Expense", "Deposit"]}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="footer">
          <Button
            name={"Save"}
            className={"save"}
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
