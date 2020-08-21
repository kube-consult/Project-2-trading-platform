// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    console.log("test1");
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      first: req.body.data.first,
      last: req.body.data.last,
      email: req.body.data.email,
      password: req.body.data.password,
      address: req.body.data.address
    })
      .then(() => {
        res.send("ok");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/buy", (req, res) => {
    console.log("test11");
    console.log("test 16", db.UserStocks);
    db.Stocks.create({
      Code: req.body.data.Code,
      Company: req.body.data.Company,
      PurchasePrice: req.body.data.PurchasePrice,
      SoldPrice: req.body.data.SoldPrice,
      Units: req.body.data.Units,
      Watched: req.body.data.Watched
    })
      .then(result => {
        console.log(result);
        console.log("test 15", result.dataValues.id);
        console.log("test 16", db.UserStocks);
        console.log(req.user);
        req.user.addStocks(result)
        // db.UserStocks.create({
        //   UserId: req.user.id,
        //   StockId: result.dataValues.id
        // })
          .then(() => {
            res.send("ok");
          })
          .catch(err => {
            console.log("1",err);
            res.status(500).json(err);
          });
        res.send("ok");
      })
      .catch(err => {
        console.log("2",err);
        res.status(401).json(err);
      });
  });

  app.post("/api/card", (req, res) => {
    console.log("test11");
    console.log(req.user);
    //req.user.createCards(
    db.Cards.create({
      longNumber: req.body.data.longCard,
      expire: req.body.data.expire,
      lastThree: req.body.data.lastThree,
      UserId: req.user.id
    })
      //)
      .then(() => {
        res.send("ok");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
