// Remove from the DB all categories which appear in one or two quotes
const { QueryTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Quote = require('../../models/Quote');
const Category = require('../../models/Category');
const QuoteCategory = require('../../models/QuoteCategory');

/**
 * Removes from the database all categories that appear in one or two quotes.
 * Also removes quotes that have no categories left after rare category deletion.
 *
 * Steps:
 * 1. Finds and deletes categories associated with 1 or 2 quotes.
 * 2. Finds and deletes quotes without any categories.
 *
 * @async
 * @function removeRareCategories
 * @returns {Promise<void>}
 */
async function removeRareCategories() {
  try {
    // STEP 1. Remove rare categories
    // Find categories that appear only in one or two quotes
    const rareCategories = await QuoteCategory.findAll({
      attributes: ['CategoryId'],
      group: ['CategoryId'],
      having: sequelize.literal('COUNT(*) <= 2'),
      raw: true,
      pluck: 'CategoryId', // NB: if 'pluck' does not work, use map below
    });

    // Get the IDs of rare categories
    const rareCategoryIds = rareCategories.map(
      (category) => category.CategoryId
    );

    console.log(rareCategoryIds);

    // Remove rare categories by ids
    await Category.destroy({
      where: {
        id: rareCategoryIds,
      },
    });

    // STEP 2. Remove quotes without categories which are left after removal of the rare categories
    // Find quotes without categories
    const quotesWithoutCategories = await sequelize.query(
      `SELECT "Quotes".*
       FROM "Quotes"
       LEFT JOIN "QuoteCategories" ON "Quotes".id = "QuoteCategories"."QuoteId"
       WHERE "QuoteCategories"."CategoryId" IS NULL;`,
      { type: QueryTypes.SELECT }
    );

    // Get the IDs of the quotes without categories
    const quotesWithoutCategoriesIds = quotesWithoutCategories.map(
      (quote) => quote.id
    );

    // Remove quotes without categories
    await Quote.destroy({
      where: {
        id: quotesWithoutCategoriesIds,
      },
    });

    console.log(`Rare categories removed successfully.`);
  } catch (error) {
    console.error(`Error removing rare categories:`, error);
  }
}

removeRareCategories();
