import { MouseEventHandler } from "react";
import Button from "../../components/Button";
import Text from "../../components/Text";
import "./TransactionComponent.css";

function TransactionComponent(props: {
  amount: number;
  date: string;
  description: string;
  type: string;
  editTransaction: MouseEventHandler<HTMLButtonElement>;
  deleteTransaction: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="transaction">
      <div className={"editTransaction"} onClick={() => props.editTransaction}>
        <Text text={`${props.description}`} className={"description"} />
        <Text
          text={`${props.amount.toString()} €`}
          className={props.type === "Expense" ? "expense" : "deposit"}
        />
        <Text
          className={"date"}
          text={`${props.date.substring(0, 10)} ${props.date.split("T")[1]}`}
        />
      </div>
      <div className="buttonContainer">
        <Button
          name={"EDIT"}
          className={"editButton"}
          onClick={props.editTransaction}
        />
        <Button
          name={"DELETE"}
          className={"deleteButton"}
          onClick={props.deleteTransaction}
        />
      </div>
    </div>
  );
}

export default TransactionComponent;
