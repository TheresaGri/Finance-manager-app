import express from "express";
import fs from "fs";
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req,res) => {
  const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
  res.json(categoriesData);
});

export {categoriesRouter};