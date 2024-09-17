const Recipe = require("../model/recipesModel");
const factory = require("../controller/handleFactory");

exports.aliasTopTour = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = "-totalView -rating";
    next();
};

exports.createRecipes = factory.createOne(Recipe);
exports.getAllRecipes = factory.getAll(Recipe);
exports.getRecipe = factory.getOne(Recipe);
exports.updateRecipe = factory.updateOne(Recipe);
exports.deleteRecipe = factory.deleteOne(Recipe);
