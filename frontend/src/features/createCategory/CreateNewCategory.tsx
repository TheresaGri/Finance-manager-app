import Button from "../../components/Button";
import { useState } from "react";
import postCategory from "../../api/postCategory";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Label from "../../components/Label";
import "./CreateNewCategory.css";
import CategoryType from "../../utils/types/CategoryType";

function CreateNewCategory(props: { onSetCategories: Function, categories: Array<CategoryType> }) {
  const [categoryText, setCategoryText] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [openCreateTransactionModal, setOpenCreateTransactionModal] =
    useState<boolean>(false);

  function createCategory(): void {
    let newCategory = {
      name: categoryText,
      color: color,
    };
    props.onSetCategories([...props.categories, newCategory])
    postCategory(newCategory);
    setOpenCreateTransactionModal(false);
  }

  return (
    <div>
      <Button
        name={"Create Category"}
        className={"createCategory"}
        onClick={() => setOpenCreateTransactionModal(true)}
      />
      <div className="createCategory">
        {openCreateTransactionModal && (
          <div className="modalOverlay">
            <div className="modalContainer">
              <div className="title">
                <Header heading={"Create new Category"} />
              </div>
              <div className="body">
                <Label text={"name"} />
                <Input
                  type={"text"}
                  className={"categoryNameInputField"}
                  value={categoryText}
                  onChange={(e) => setCategoryText(e.target.value)}
                />
                <Label text={"Choose color"} />
                <Input
                  className={"categoryNameColorField"}
                  type={"color"}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="footer">
                <Button
                  name={"Save"}
                  className={"save"}
                  onClick={() => createCategory()}
                />
                <Button
                  name={"Cancel"}
                  className={"cancel"}
                  onClick={() => setOpenCreateTransactionModal(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateNewCategory;
