import { MouseEventHandler } from "react";
import Button from "../../components/Button";
import Text from "../../components/Text";
import "./TransactionComponent.css";

function TransactionComponent(props: {
  amount: number;
  date: string;
  description: string;
  type: string;
  colorOfCategory: string,
  category:string | boolean;
  onEditTransaction: MouseEventHandler<HTMLButtonElement>;
  onDeleteTransaction: MouseEventHandler<HTMLButtonElement>;
}) {

  return (
    <div className="transaction" style = {{backgroundColor: `${props.colorOfCategory}`  }}>
      <div className={"editTransaction"} onClick={() => props.onEditTransaction}>
        <Text text={`${props.description}`} className={"description"} />
        <Text
          text={`${props.amount} €`}
          className={props.type === "Expense" ? "expense" : "deposit"}
        />
        <Text
          className={"date"}
          text={`${props.date.substring(0, 10)} ${props.date.split("T")[1]}`}
        />
        <Text
          className={"category"}
          text={`${props.category}`}
        />
      </div>
      <div className="buttonContainer">
        <Button
          name={"EDIT"}
          className={"editButton"}
          onClick={props.onEditTransaction}
        />
        <Button
          name={"DELETE"}
          className={"deleteButton"}
          onClick={props.onDeleteTransaction}
        />
      </div>
    </div>
  );
}

export default TransactionComponent;
