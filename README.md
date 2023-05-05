# Sweep's API

This code sets up a web server using the Express framework to handle requests for movie and TV show data. The data is stored in a MongoDB database, and the server uses the MongoClient library to connect to the database. The server responds to GET requests on the `/movies` and `/tv` routes with either a list of movies or TV shows, or a single movie or TV show object, depending on the presence of the `id` query parameter.

## Prerequisites

To use this API, you will need the following:

* Node.js (v14 or higher)
* MongoDB database
* [Movies dataset](https://www.kaggle.com/datasets/akshaypawar7/millions-of-movies)
* [TV dataset](https://developers.themoviedb.org/3/getting-started/daily-file-exports)

## Installation

1. Clone the repository:

```
git clone https://github.com/SweepApp/sweep-api.git
```

2. Install dependencies:

```
npm install
```

3. Create a .env file in the root directory of the project and set the MONGODB_URL and MONGODB environment variables to your MongoDB connection URL and database name respectively.

```
MONGODB_URL=<your_mongodb_connection_url>
MONGODB=<your_database_name>
API_KEY=<your_desired_api_key>
```

4. Start the server:

```
node server.mjs
```

The server will start listening on port `8080`.

## API Endpoints

### `GET /movies` & `GET /tv`

This endpoint returns an array of movie documents from the database. Clients can optionally provide a movie ID in the query string to retrieve a single movie document.

#### Query Parameters

* `api_key`: A required parameter that clients must provide with a valid API key.
* `id`: An optional parameter that clients can provide to retrieve a single movie document by ID.
* `page`: An optional parameter that clients can provide to retrieve anothers pages.
* `note`: An optional parameter that clients can provide to retrieve documents who have a note greater or equal than `x` (only for `/movies`)
* `popularity`: An optional parameter that clients can provide to retrieve documents who have a popularity greater or equal than `x` (only for `/tv`)

##### Example 

You can find movies with a score of 8 or more on the 3rd page.
```
http://localhost:8080/movies?api_key=<api_key>&note=8&page=3
```

#### Response

* If the API key is invalid, the server will respond with a 404 status code and a JSON object with the status property set to "Invalid API key: You must be granted a valid key.".
* If the id query parameter is not provided, the server will respond with a 200 status code and an array of movie documents.
* If the id query parameter is provided but the movie document is not found in the database, the server will respond with a 404 status code and a JSON object with the status property set to "Invalid ID: What you are looking for doesn't exist.".
* If the id query parameter is provided and the movie document is found in the database, the server will respond with a 200 status code and the movie document.