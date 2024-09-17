const Recipe = require("../model/recipesModel");
const factory = require("../controller/handleFactory");

exports.getAllRecipes = factory.getAll(Recipe);
exports.createRecipes = factory.createOne(Recipe);
