import express from "express";
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req,res) => {
  res.json({message: "success"});
});

export {categoriesRouter};