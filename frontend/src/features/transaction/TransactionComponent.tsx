import { MouseEventHandler } from "react";
import Button from "../../components/Button";
import Text from "../../components/Text";

function TransactionComponent(props: {
  amount: number;
  hour: number;
  minute: number;
  category: number;
  editTransaction: MouseEventHandler<HTMLButtonElement>;
  deleteTransaction: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="event">
      <div
        className={props.category === 2 ? "work" : "personal"}
        onClick={() => props.editTransaction}
      >
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

        <Text text={props.amount.toString()} className={"name"}/>
        <Text
          className="time"
          text={`${props.hour.toString().padStart(2, "0")}h${props.minute
            .toString()
            .padStart(2, "0")}`}
        />
      </div>
    </div>
  );
}

export default TransactionComponent;
