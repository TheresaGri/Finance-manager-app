import express from "express";
import fs from "fs";
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req,res) => {
  const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
  res.json(categoriesData);
});

// categoriesRouter.get("/:categoryId", (req, res) => {
//   const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
//   const category = categoriesData.find((category) => category.id === parseInt(req.params.categoryId));
//   if (!category) {
//     res.status(404).send("Catogory not found");
//   } else {
//     res.json(category);
//   }
// });

categoriesRouter.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
  const categoryIndex = categoriesData.findIndex((category) => category.id === id);

  if (categoryIndex === -1) {
    return res.status(404).send("Catogory not found");
  }

  const updatedCategory = { ...categoriesData[categoryIndex], ...req.body };
  categoriesData[categoryIndex] = updatedCategory;

  fs.writeFileSync("./data/categories.json", JSON.stringify(categoriesData));

  res.json(updatedCategory);
});

export {categoriesRouter};