// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
// Requiring our models and passport as we've configured it
const db = require("../models");
const unirest = require("unirest");
//const axios = require("axios");
apiKey = "bsrlqnv48v6tucpgg81g";
//const code = "AMZN";

module.exports = function(app) {
  app.get("/", (req, res) => {
    allData().then(response => {
      res.render("index", { data: response });
    });
  });

  app.get("/signup", (req, res) => {
    allData().then(response => {
      // console.log(xyz);
      console.log(response);
      res.render("signup", { data: response });
    });
  });

  app.get("/login", (req, res) => {
    allData().then(response => {
      // console.log(xyz);
      console.log(response);
      res.render("login", { data: response });
    });
  });

  app.get("/trade", (req, res) => {
    allData().then(response => {
      if (!req.user) {
        res.render("login", { data: response });
      } else {
        res.render("trade", { data: response });
      }
    });
  });

  app.get("/cards", (req, res) => {
    allData().then(response => {
      if (!req.user) {
        res.render("login", { data: response });
      } else {
        res.render("cards", { data: response });
      }
    });
  });

  app.get("/cards", (req, res) => {
    allData().then(response => {
      if (!req.user) {
        res.render("login", { data: response });
      } else {
        res.render("cards", { data: response });
      }
    });
  });

  function getNews() {
    return new Promise(resolve => {
      unirest
        .get("https://morning-star.p.rapidapi.com/news/list")
        .headers({
          Accept: "application/json",
          "x-rapidapi-host": "morning-star.p.rapidapi.com",
          "x-rapidapi-key": "435f0cdaeamshd0fe4e59b8a1c27p16ae90jsn8bb53a2736cc"
        })
        .query({
          performanceId: "0P0000OQN8"
        })
        .end(response => {
          // console.log(response.body);
          resolve(response.body);
        });
    });
  }

  function getStock() {
    return new Promise(resolve => {
      unirest
        .get(
          "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/financial-data"
        )
        .headers({
          Accept: "application/json",
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
          "x-rapidapi-key": "435f0cdaeamshd0fe4e59b8a1c27p16ae90jsn8bb53a2736cc"
        })
        .end(response => {
          // console.log(response.body);
          resolve(response.body);
        });
    });
  }

  function allData() {
    return new Promise(resolve => {
      const data = { news: {}, stock: {} };
      getNews().then(response => {
        data.news = response;
        getStock().then(response => {
          data.stock = response;
          // console.log(data);
          resolve(data);
        });
      });
    });
  }

  app.get("/userSummery", async (req, res) => {
    try {
      //res.render("userSummery", { stk: stock });

      allData().then(async response => {
        try {
          if (req.user) {
            const user = await db.User.findByPk(req.user.id);
            const stock = await user.getStocks();
            console.log("stock", stock);
            //res.render("userSummery", { data: response });
            res.render("userSummery", { data: response, stk: stock });
          } else {
            res.render("login", { data: response });
          }
        } catch (e) {
          console.log("error1", e);
          res.end();
        }
      });
    } catch (e) {
      console.log("error2", e);
      res.end();
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });
};
