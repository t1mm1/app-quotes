const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const QuoteCategory = require('./QuoteCategory');
const Category = require('./Category');

const afterFind = (results) => {
    if (results) {
        const quotes = Array.isArray(results) ? results : [results];
        quotes.forEach(quote => {
            if (quote.Categories) {
                quote.dataValues.categoies = quote.Categories.map(
                    category => category.name
                );
                delete quote.dataValues.Categories;
            }
        })
    }
}

const hooks = { afterFind: afterFind };

const fields = {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}

const Quote = sequelize.define('Quote', fields, { hooks });

Quote.belongsToMany(Category, { through: QuoteCategory });
Category.belongsToMany(Quote, { through: QuoteCategory });

module.exports = Quote;