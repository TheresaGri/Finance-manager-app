import Button from "../../components/Button";

function CreateNewTransaction(props: { onCreateTransaction: Function }) {
  return (
    <Button
      name={"Create Transaction"}
      className={"createTransaction"}
      onClick={() => props.onCreateTransaction()}
    />
  );
}

export default CreateNewTransaction;
