const quoteService = require('../services/quote');

module.exports.getAllQuotes = async (request, responce) => {
    const { limit = 5, offset = 0, author, text, category } = request.query;

    try {
        const quotes = await quoteService.findQuotes(limit, offset, author, text, category);
        responce.json(quotes);
    }
    catch (error) {
        responce.status(500).json({ 
            message: error.message,
        })
    }
}

module.exports.getQuoteById = async (request, responce) => {
    const id = request.params.id;

    try {
        const quote = await quoteService.findSingleQuote(id);
        if (quote) {
            responce.json(quote);
        }
        else {
            responce.status(404).json({
                message: `Quote with ID ${id} not found.`,
            });
        }
    }
    catch (error) {
        responce.status(500).json({
            message: error.message,
        })
    }   
}

module.exports.getRandomQuotes = async (request, responce) => {
    const { limit = 5 } = request.query;

    try {
        const quotes = await quoteService.findRandomQuotes(limit);
        responce.json(quotes);
    }
    catch (error) {
        responce.status(500).json({
            message: error.message,
        })
    }
}

module.exports.postQuote = async (request, response) => {
    const { text, author, categories } = request.body;

    try {
        const quote = await quoteService.createQuote({ text, author, categories });
        response.status(200).json(quote);
    }
    catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
}