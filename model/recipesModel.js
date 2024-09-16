const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A recipe must have a name"],
            maxLength: [40, "A recipe must have less than 40 characters"],
            minLength: [3, "A recipe must have more than 3 characters"],
            trim: true,
        },
        category: {
            type: String,
            required: [true, "A recipe must have a category"],
            trim: true,
            // enum: ["breakfast", "lunch", "dinner", "dessert", "snack"],
        },
        country: {
            type: String,
            required: [true, "A recipe must have a country"],
            trim: true,
            // enum: ["Bangladesh", "India", "China"]
        },
        cuisine: {
            type: String,
            required: [true, "A recipe must have a cuisine"],
            trim: true,
            // enum: ["contemporary", "traditional", "vegetarian", "vegan", "gluten-free"]
        },
        rating: {
            type: Number,
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating must be at most 5"],
            default: 0,
        },
        ingredients: [
            {
                type: String,
                required: [true, "A recipe must have ingredients"],
                trim: true,
            },
        ],
        instructions: [
            {
                type: String,
                required: [true, "A recipe must have instructions"],
                trim: true,
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        image: String,
        totalView: {
            type: Number,
            default: 0,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
