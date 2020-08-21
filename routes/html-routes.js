// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
// const express = require("express");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const unirest = require("unirest");

// const axios = require("axios");

// apiKey = "bsrlqnv48v6tucpgg81g";

// const code = "AMZN";

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/members", (req, res) => {
    res.render("members");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/trade", (req, res) => {
    console.log("test 2");
    res.render("trade");
  });

  app.get("/cards", (req, res) => {
    if (!req.user) {
      res.render("login");
    } else {
      res.render("cards");
    }
  });

  app.get("/userSummery", (req, res) => {
    if (req.user) {
      res.render("userSummery");
    } else {
      res.render("login");
    }
  });

  // Route for getting financial data
  app.get("/company-profile", req => {
    unirest(
      "GET",
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/financial-data"
    );

    req.headers({
      "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
      "x-rapidapi-key": "435f0cdaeamshd0fe4e59b8a1c27p16ae90jsn8bb53a2736cc",
      useQueryString: true
    });

    req.end(res => {
      if (res.error) {
        throw new Error(res.error);
      }

      console.log(res.body);
      res.render("index", body);
    });
  });

  axios({
    method: "GET",
    url:
      "https://finnhub.io/api/v1/stock/profile2?symbol=" +
      code +
      "&token=" +
      apiKey,
    responseType: { json: true }
  }).then(body => {
    console.log("     ------     ");
    console.log("Country: " + body.country);
    console.log("Currency: " + body.currency);
    console.log("Listed Exchange: " + body.exchange);
    console.log(body.logo);
    console.log("_______________");

    res.render("index", body);
  });
  // Route for getting market news data
  app.get("/market-news", (req, res) => {
    axios({
      method: "GET",
      url: "https://finnhub.io/api/v1/news?category=general&token=" + apiKey,
      responseType: { json: true }
    }).then(body => {
      console.log(body.headline);
      console.log(body.summary);

      res.render("index", body);
    });
  });

  // Route for getting stock price data
  app.get("/stock-price", (req, res) => {
    axios({
      method: "GET",
      url:
        "https://finnhub.io/api/v1/quote?symbol=" + code + "&token=" + apiKey,
      responseType: { json: true }
    }).then(body => {
      console.log("     ------     ");
      console.log("Open price for " + code + ": " + body.o);
      console.log("Daily high for " + code + ": " + body.h);
      console.log("Daily low for " + code + ": " + body.l);
      console.log("Current price for " + code + ": " + body.c);
      console.log("_______________");

      res.render("index", body);
    });
  });

  app.get("/userSummery", (req, res) => {
    if (req.user) {
      res.render("userSummery");
    } else {
      res.render("login");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });
};
