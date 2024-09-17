const recipeController = require("../controller/recipeController");
const router = require("express").Router();

// Define routes
router.get(
    "/top-5-recipes",
    recipeController.aliasTopTour,
    recipeController.getAllRecipes
);

router
    .route("/")
    .get(recipeController.getAllRecipes)
    .post(recipeController.createRecipes);

router
    .route("/:id")
    .get(recipeController.getRecipe)
    .patch(recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe);

module.exports = router;
