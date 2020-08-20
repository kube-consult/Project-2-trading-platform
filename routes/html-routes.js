// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
// const express = require("express");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members");
    }
    res.render("signup");
  });

  app.get("/members", (req, res) => {
    res.render("members");
  });

  // Sending the user to sign up page
  app.get("/index", (req, res) => {
    res.render("index");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });
};
