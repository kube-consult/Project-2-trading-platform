// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
// const express = require("express");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    res.render("login");
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

};
