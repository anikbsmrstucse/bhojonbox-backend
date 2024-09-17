const recipeController = require("../controller/recipeController");
const router = require("express").Router();

// Define routes

router
    .route("/")
    .get(recipeController.getAllRecipes)
    .post(recipeController.createRecipes);

module.exports = router;
