# Quotes DB Server

This is the backend of the quotes application, built with Node.js and Express. It provides a RESTful API for managing quotes and categories, with PostgreSQL as the database. All responses are in JSON format. The project is designed for easy local development and supports high-volume quote imports.

## Features

- Express.js backend server
- PostgreSQL database (using Sequelize ORM)
- Supports import of 500,000+ quotes via CSV
- Categories are automatically created and linked to quotes
- Efficient and validated CRUD operations on quotes and categories
- All routes support JSON responses and requests
- Contains scripts for importing and cleaning up categories

---

## Required Packages

- express
- cors
- dotenv
- express-validator
- pg
- sequelize
- csv-parser

For development: 
- nodemon

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── database.js
│   ├── controllers/
│   │   ├── categories.js
│   │   └── quotes.js
│   ├── database/
│   │   ├── data/
│   │   │   └── test-quotes.csv
│   │   └── seed/
│   │       ├── importQuotes.js
│   │       └── removeCategories.js
│   ├── middlewares/
│   │   ├── category.js
│   │   ├── cors.js
│   │   ├── handler.js
│   │   └── quote.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Quote.js
│   │   └── QuoteCategory.js
│   ├── routes/
│   │   ├── categories.js
│   │   └── quotes.js
│   ├── services/
│   │   ├── categories.js
│   │   └── quote.js
│   └── app.js
│
├── .env.sample
├── .gitignore
├── docker-compose.yml
├── package.json
└── server.js
```


## Database

Uses **PostgreSQL** as the database. Credentials and config are managed via environment variables in ```.env```.

**Note:** The ```docker-compose.yml``` file sets up the database service required for development.

## Setup & Installation
1. Clone the repository
2. Install dependencies

```
npm install
```

3. Copy ```.env.sample``` to ```.env``` and fill in your database credentials

````
    PORT = '3000'
    HOST = '0.0.0.0'
    DB_DIALECT = 'postgres'
    DB_NAME = 'db'
    DB_HOST = 'localhost'
    DB_USER = '*user name*'
    DB_PASS = '*user password*'
    DB_PORT = '5432'
````

4. Start the services (API and PostgreSQL)

````
    docker compose up -d
````

5. Stop the services

````
    docker compose down
````

---

## Development

- Use nodemon for auto-restart during development.
- The main application file is at ```server/src/app.js```.
- Import quotes via

````
    node server/src/database/seed/importQuotes.js
````

- After import you can optionally remove categories with ≤2 quotes

````
    node server/src/database/seed/removeCategories.js
````

**Note** Quote-category relations and keys are auto-managed by the script.

--

# Models

- ```src/models/Quote.js``` - Quote model
- ```src/models/Category.js``` - Category model
- ```src/models/QuoteCategory.js``` - Many-to-many relationship between quotes and categories

## On quote deletion

- Relations to categories (tags) are deleted, but the category itself remains in the database.

# API Endpoints

## Quotes

Route ```/quotes```

- **GET /quotes**

 - List quotes (default: limit=5, offset=0)
 - Searchable by author, text, category
 - Query example ```/quotes?text=love&author=william&category=metaphor&limit=1&offset=0```
  - Validation
    - ```limit```: min=1
    - ```offset```: min=0
    - ```text```: optional, min 10 chars
    - ```author```: optional, min 2 chars
    - ```category```: optional, array, only letters, digits, dash (-)
  - Returns: Array of quote objects

- **GET /quotes/random**

  - Get random quotes ```limit``` param): ```/quotes/random?limit=1```

- **POST /quotes**

  - Add a quote (JSON in body)
````
{
  "text": "this is quote text",
  "author": "this is author",
  "categories": [
    "category-1",
    "tik-tak-toy",
    "category-2"
  ]
}
````
  - If a category doesn't exist, it's created automatically.
- **DELETE /quotes/:id**
  - Delete a quote by ID
- **PATCH /quotes/:id**
  - Edit a quote (fields not in JSON are not updated)
  - If a new category is given, it's created

---

## Categories

Route ```/categories```

- **GET /categories**
  - List categories (default: limit=5, offset=0)
  - Filter by category name (letters, digits, dash only)
  - Returns array of 
  ```
  { "id": 1, "name": "love" }
  ```
- **GET /categories/:id**
  - Get category by ID

- **GET /categories/random**
  - Get random category

# Validation Middleware

- ```/server/src/middlewares/quote.js```
- ```/server/src/middlewares/category.js```
- ```/src/middlewares/handler.js```
- ```/server/src/middlewares/cors.js```

# Controllers

```server/src/controllers/categories.js```
- getCategories
- getCategory
- getRandom

```server/src/controllers/quotes.js``` 
- getQuotes
- getQuote
- getRandom
- postQuote
- deleteQuote
- patchQuote

# Services

- Quotes ```/server/src/services/quote.js```
  - ```getQuotes```
  - ```getQuotegetRandom```
  - ```createQuote```
  - ```deleteQuote```
  - ```editQuote```
  - Helper ```createCategories```
- Categories ```/server/src/services/categories.js```
  - ```getCategories```
  - ```getCategory```
  - ```getRandom```

# Example

GET ```/quotes?author=Shakespeare&text=love&category=poetry```

Response

```
[
  {
    "text": "Love all, trust a few, do wrong to none.",
    "author": "William Shakespeare",
    "categories": [
      "poetry",
      "love"
    ]
  }
]
```

---

## Credits

Developed by [pkasianov](https://www.drupal.org/u/pkasianov).

---

## License

This module is open-source and distributed under the [GPL-2.0-or-later](https://www.drupal.org/about/licensing).

---

## Feedback and Contributions

If you have suggestions, find bugs, or want to contribute improvements, feel free to [text me on Drupal.org](https://www.drupal.org/u/pkasianov) or submit a pull request.  

Your feedback and contributions are always welcome!
