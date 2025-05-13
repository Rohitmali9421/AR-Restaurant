const express = require("express");
const {
  handleGetCategory,
  handleCreateCategory,
  handleDeleteCategory,
  handleUpdateCategory,
} = require("../Controllers/Category");


const router = express.Router();

router
  .route("/category")
  .get(handleGetCategory)
  .post(handleCreateCategory);

router
  .route("/category/:id")
  .delete(handleDeleteCategory)
  .put(handleUpdateCategory);
module.exports = router;
