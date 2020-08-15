const express = require("express");

const router = express.Router();

const finnhub = require("finnhub");

const stocks = require("../models/stocks.js");

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
apiKey = "bsrlqnv48v6tucpgg81g";
const finnhubClient = new finnhub.DefaultApi();

const request = require('request');


let code = "AMZN"; // just an example - replace with user input/search later on

// Get company profile data
request("https://finnhub.io/api/v1/stock/profile2?symbol=" + code + "&token=" + apiKey, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log("     ------     ");
    console.log("Country: " + body.country);
    console.log("Currency: " + body.currency);
    console.log("Listed Exchange: " + body.exchange);
    console.log(body.logo);
    console.log("_______________");
});


// Get quote data for company
request("https://finnhub.io/api/v1/quote?symbol=" + code + "&token=" + apiKey, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log("     ------     ");
    console.log("Open price for " + code + ": " + body.o);
    console.log("Daily high for " + code + ": " + body.h);
    console.log("_______________");
});

// Get company news based on company code
finnhubClient.companyNews(code, "2020-08-08", "2020-08-15", (error, data, response) => {
    if (error) {
        console.error(error);
    } else {
        // data = date.filter(news => news.length = 6);
        console.log(data.explanation);
        for (let i = 0; i < data.length; i++) {
            console.log(category + "</br>");
            console.log(datetime + "</br>");
            console.log(headline + "</br>");
            console.log(image + "</br>");
            console.log(source + "</br>");
            console.log(url + "</br>");
        }
    }
});