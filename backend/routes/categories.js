import express from "express";
import fs from "fs";
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req,res) => {
  const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
  res.json(categoriesData);
});

categoriesRouter.get("/:categoryId", (req, res) => {
  const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
  const category = categoriesData.find((category) => category.id === parseInt(req.params.categoryId));
  if (!category) {
    res.status(404).send("Catogory not found");
  } else {
    res.json(category);
  }
});

export {categoriesRouter};