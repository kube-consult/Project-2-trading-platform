// const express = require("express");

// const router = express.Router();

const finnhub = require("finnhub");

// const stocks = require("../models/stocks.js");

apiKey = "bsrlqnv48v6tucpgg81g";
const finnhubClient = new finnhub.DefaultApi();

const request = require("request");

const code = "AMZN"; // just an example - replace with user input/search later on

// Get company profile data
request(
  "https://finnhub.io/api/v1/stock/profile2?symbol=" +
    code +
    "&token=" +
    apiKey,
  { json: true },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log("     ------     ");
    console.log("Country: " + body.country);
    console.log("Currency: " + body.currency);
    console.log("Listed Exchange: " + body.exchange);
    console.log(body.logo);
    console.log("_______________");
  }
);

// Get quote data for company
request(
  "https://finnhub.io/api/v1/quote?symbol=" + code + "&token=" + apiKey,
  { json: true },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log("     ------     ");
    console.log("Open price for " + code + ": " + body.o);
    console.log("Daily high for " + code + ": " + body.h);
    console.log("_______________");
  }
);

// Get company news based on company code
finnhubClient.companyNews(code, "2020-08-10", "2020-08-15", error => {
  if (error) {
    console.error(error);
  } else {
    // data = date.filter(news => news.length = 6);
    console.log(body.url);
    console.log(body.explanation);
    // for (let i = 0; i < data.length; i++) {
    //   console.log(data.category + "</br>");
    //   console.log(data.datetime + "</br>");
    //   console.log(data.headline + "</br>");
    //   console.log(data.image + "</br>");
    //   console.log(data.source + "</br>");
    //   console.log(data.url + "</br>");
    // }
  }
});

request(
  "https://finnhub.io/api/v1/news?category=general&token=" + apiKey,
  { json: true },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.headline);
    console.log(body.summary);
  }
);
