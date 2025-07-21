const Category = require('../models/Category');
const categoriesService = require('../services/categories');

// Get all gategories.
module.exports.getAllCategories = async (request, responce) => {
    const { limit = 5, offset = 0, name } = request.query;

    try {
        const quotes = await categoriesService.findCategories(limit, offset, name);
        responce.json(quotes);
    }
    catch (error) {
        responce.status(500).send({
            message: error.message,
        })
    }
}

// Get quotes by category ID.
module.exports.getCategoryById = async (request, responce) => {
    const { id } = request.params;

    try {
        const category = await categoriesService.findSingleCategory(id);
        if (category) {
            responce.json(category);
        }
        else {
            responce.status(404).json({
                message: `Category with ID ${id} not found.`,
            });
        }
    }
    catch (error) {
        responce.status(500).send({
            message: error.message,
        })
    }
}

module.exports.getRandomCategories = async (request, responce) => {
    const { limit = 5 } = request.query;

    try {
        const categories = await categoriesService.findRandomCategories(limit);
        responce.json(categories);
    }
    catch (error) {
        responce.status(500).send({
            message: error.message,
        })
    }
}
