const { Op } = require('sequelize');
const Category = require('../models/Category');
const Quote = require('../models/Quote');
const sequelize = require('../config/database');

const attributes = { exclude: ['createdAt', 'updatedAt'] };
const includeCategoryConfig = {
    model: Category,
    attributes: ['name'],
    through: { attributes: [] },
}

// Get all quotes.
module.exports.findQuotes = async (limit, offset, author, text, category) => {
    const whereClause = {};
    author && (whereClause.author = { [Op.like]: `%${author}%` });
    text && (whereClause.text = { [Op.like]: `%${text}%` });

    let quotes = await Quote.findAll({ 
        attributes: attributes,
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']],
        include: {
            ...includeCategoryConfig,
            where: category ? { name: category } : {}
        },
        where: whereClause,
    });

    // TODO: Try to find the way to filter by category name and find
    // names of all categories for the quote in one DB request
    if (category) {
        const ids = quotes.map((quote) => quote.id);
        quotes = await Quote.findAll({
            attributes,
            order: [['id', 'ASC']],
            include: includeCategoryConfig,
            where: { id: ids },
        });
    }

    return quotes;
}

// Get quote by ID.
module.exports.findSingleQuote = async (id) => {
    return await Quote.findByPk(id, {
        attributes: attributes,
        include: includeCategoryConfig,
    });
}

// Get random quotes.
module.exports.findRandomQuotes = async (limit) => {
    return await Quote.findAll({
        attributes: attributes,
        limit: limit,
        order: sequelize.random(),
        include: includeCategoryConfig
    });
}
