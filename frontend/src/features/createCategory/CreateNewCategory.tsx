import Button from "../../components/Button";

function CreateNewCategory(props: { onCreateCategory: Function }) {
  return (
    <Button
      name={"Create Category"}
      className={"createCategory"}
      onClick={() => props.onCreateCategory()}
    />
  );
}

export default CreateNewCategory;
