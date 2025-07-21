const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const sequelize = require('../../config/database');
const Quote = require('../../models/Quote');
const Category = require('../../models/Category');

const CSV_FILENAME = path.resolve(__dirname, '../data/quotes.csv');
const BATCH_SIZE = 2000;
const BATCH_TIMEOUT = 30000;

function validateAndSplitCategories(categoriesStr) {
    const categories = categoriesStr.split(', ');
    return categories.some(
        (category) => category.includes(' ') || /[A-Z]/.test(category)
    )
    ? []
    : categories;
}

function pauseStream(stream, time) {
    stream.pause();

    setTimeout(() => {
        stream.resume();
    }, time);
}

async function importQuotes() {
    try {
        // Set force as true is drop existing tables and re-create them.
        await sequelize.sync({ force: true });

        let rowIndex = 0;

        const stream = fs
            .createReadStream(CSV_FILENAME)
            .pipe(csv())
            .on('data', async (row) => {
                rowIndex += 1;
                if (rowIndex % BATCH_SIZE === 0) {
                    console.log('Paused', rowIndex);
                    pauseStream(stream, BATCH_TIMEOUT);
                }

                // 1. Validate row.
                const categories = validateAndSplitCategories(row.category);
                if (categories.length === 0) {
                    return;
                }

                // 2. If row valid then add quote to the Quotes table via model.
                const quote = await Quote.create({
                    text: row.quote,
                    author: row.author.split(',')[0].slice(0, 255),
                });

                // 3. Add categories.
                for (let category of categories) {
                    await Category.findOrCreate({ 
                        where: { name: category }, 
                    });
                }

                // 4. Find categories in the quote's table.
                const categoryInstances = await Category.findAll({
                    where: { name : categories },
                });

                // 5. Add categories.
                await quote.addCategories(categoryInstances);
            })
            .on('end', () =>
                console.log('Processing of the CSV file with quotes finished')
            )
            .on('error', (error) =>
                console.error('Error during CSV file parsing', error)
            );
    }
    catch (error) {
        console.error('Error importing quotes', error);
    }
}

importQuotes();