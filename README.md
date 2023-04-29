# Sweep's API

This technical documentation outlines the usage and implementation of Sweep API built using Express.js and MongoDB.

## Introduction

This API provides a simple way to retrieve information about movies and TV shows. It retrieves data from a MongoDB database using the MongoDB driver for Node.js.

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
```

4. Start the API server:

```
node server.mjs
```

The server will start listening on port `8080`.