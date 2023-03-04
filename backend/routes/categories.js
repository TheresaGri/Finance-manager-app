import express from "express";
import fs from "fs";
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req,res) => {
  const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
  res.json(categoriesData);
});

categoriesRouter.get("/:id", (req, res) => {
  const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
  const categoryId = categories.find((category) => category.id.toString() === req.params.id);
  res.json(categoryId);
});

categoriesRouter.post("/", (req, res) => {
  const newCategory = req.body;
  let categories = JSON.parse(fs.readFileSync("./data/categories.json"));

  let maxId = 0;
  for (let category of categories) {
    maxId = Math.max(maxId, category.id);
  }
  newCategory.id = maxId + 1;

  categories.push(newCategory);
  fs.writeFileSync("./data/categories.json", JSON.stringify(categories));
  res.json({ status: "success" });
});

categoriesRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
  const filteredCategories = categories.filter(
    (category) => category.id !== id
  );
  fs.writeFileSync(
    "./data/categories.json",
    JSON.stringify(filteredCategories)
  );
});

categoriesRouter.put("/:id", (req, res) => {
  let id = Number(req.params.id);
  const newCategory = req.body;
  const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
  const newCategoriesIndex = categories.findIndex(
    (category) => category.id === id
  );
  const categoryId = categories[newCategoriesIndex].id;
  categories[newCategoriesIndex] = { ...newCategory, id: categoryId };
  fs.writeFileSync("./data/categories.json", JSON.stringify(categories));
});

categoriesRouter.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
  const categoryIndex = categoriesData.findIndex((category) => category.id === id);

  if (categoryIndex === -1) {
    return res.status(404).send("Category not found");
  }

  const updatedCategory = { ...categoriesData[categoryIndex], ...req.body };
  categoriesData[categoryIndex] = updatedCategory;

  fs.writeFileSync("./data/categories.json", JSON.stringify(categoriesData));

  res.json(updatedCategory);
});



export {categoriesRouter};