const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/APIFeatures");
exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const features = new ApiFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const doc = await features.query;
        res.status(200).json({
            status: "success",
            results: doc.length,
            // total: docCount,
            data: {
                data: doc,
            },
        });
    });
