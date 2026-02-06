# Random Name Lab

## Table of contents
* [Introduction](#introduction)
* [Screenshot](#screenshot)
* [Technologies](#technologies)
* [Features](#features)
* [API Endpoints](#api-endpoints)
* [How It Works](#how-it-works)
* [Status](#status)
* [Contact](#contact)

## Introduction
Random Name Lab is a full‑stack name generator built with Node.js and Express. It provides a simple API with filters and a clean UI for generating batches of names.

## Screenshot
Add a screenshot here after deployment.

## Technologies
* Node.js + Express — API and server
* Handlebars — server‑rendered UI
* Vanilla JavaScript — frontend fetch logic
* CSS + Bootstrap — layout and styling

## Features
* Generate batches of random names (1–20)
* Filter by starting letter and minimum length
* Copy all results with one click
* Clean UI with readable results

## API Endpoints
**GET `/health`**
Returns server status.

Example:
```
GET /health
```
Response:
```
{ "status": "ok" }
```

**GET `/random-name`**
Generates one or more random names.

Query params:
- `count` (1–20)
- `startsWith` (single letter)
- `length` (minimum first name length)

Examples:
```
GET /random-name?count=5
GET /random-name?startsWith=A&count=3
GET /random-name?length=6&count=10
```
Response:
```
{
  "count": 5,
  "results": [
    { "first_name": "Amara", "last_name": "Stone" },
    { "first_name": "Liam", "last_name": "Hayes" }
  ]
}
```

## How It Works
1. The server picks random names from the mock dataset.
2. Optional filters are applied before selection.
3. The UI fetches the API and renders the batch.

## Status
Project is: _Complete_

## Contact
Created by [@wemiibidun](https://github.com/wemiibidun)
