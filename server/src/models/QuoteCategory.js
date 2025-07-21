const sequelize = require('../config/database');

const QuoteCategory = sequelize.define(
    'QuoteCategory', 
    {
        // 
    }, 
    {
        indexes: [
            { name: 'QuoteCategory_QuoteId', fields: ['QuoteId'] },
            { name: 'QuoteCategory_CategoryId', fields: ['CategoryId']},
        ]
    }
);

module.exports = QuoteCategory;