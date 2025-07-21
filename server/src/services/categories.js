const { Op } = require('sequelize');
const Category = require('../models/Category');
const sequelize = require('../config/database');

const attributes = { exclude: ['createdAt', 'updatedAt'] };

// Get all quotes.
module.exports.findCategories = async (limit, offset, name) => {
    const whereClause = {};
    name && (whereClause.name = { [Op.like]: `%${name}%` });

    return await Category.findAll({ 
        attributes: attributes,
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']],
        where: whereClause,
    });
}

// Get quote by ID.
module.exports.findSingleCategory = async (id) => {
    return await Category.findByPk(id, {
        attributes: attributes,
    });
}

// Get random quotes.
module.exports.findRandomCategories = async (limit) => {
    return await Category.findAll({
        attributes: attributes,
        limit: limit,
        order: sequelize.random(),
    });
}
