import { useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Transaction from "../../types/Transaction";
import './CreateNewTransaction.css'

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
  transactions: Array<Transaction>;
}) {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");

  function createTransaction(name: string, date: {}, category: string) {
    if (date === "") {
      date = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
      };
    }
    const transaction = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      date: date,
      category: category,
    };
    props.onSetTransactions([...props.transactions, event]);

    props.onCloseWindow(false);
  }

  return (
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
      </div>
      <div className="footer">
        <Button
          name={"Save"}
          className={"save"}
          onClick={() => createTransaction(description, date, amount)}
        />
        <Button
          name={"Cancel"}
          className={"cancel"}
          onClick={() => props.onCloseWindow(false)}
        />
      </div>
    </div>
  );
}

export default CreateNewTransaction;
