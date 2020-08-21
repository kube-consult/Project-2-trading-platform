// YAHOO FINANCE
const unirest = require("unirest");

const req = unirest(
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
});

unirest("GET", "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/AAPL");

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
});

unirest("GET", "https://morning-star.p.rapidapi.com/news/list");

req.query({
  performanceId: "0P0000OQN8"
});

req.headers({
  "x-rapidapi-host": "morning-star.p.rapidapi.com",
  "x-rapidapi-key": "435f0cdaeamshd0fe4e59b8a1c27p16ae90jsn8bb53a2736cc",
  useQueryString: true
});

req.end(res => {
  if (res.error) {
    throw new Error(res.error);
  }

  console.log(res.body);
});

// const axios = require("axios");

// apiKey = "bsrlqnv48v6tucpgg81g";

// const code = "AMZN"; // just an example - replace with user input/search later on

// // FINNHUB
// // Get company profile data
// axios({
//   method: "GET",
//   url:
//     "https://finnhub.io/api/v1/stock/profile2?symbol=" +
//     code +
//     "&token=" +
//     apiKey,
//   responseType: { json: true }
// }).then(body => {
//   console.log("     ------     ");
//   console.log("Country: " + body.country);
//   console.log("Currency: " + body.currency);
//   console.log("Listed Exchange: " + body.exchange);
//   console.log(body.logo);
//   console.log("_______________");
// });

// // Get stock quote data for company
// axios({
//   method: "GET",
//   url: "https://finnhub.io/api/v1/quote?symbol=" + code + "&token=" + apiKey,
//   responseType: { json: true }
// }).then(body => {
//   console.log("     ------     ");
//   console.log("Open price for " + code + ": " + body.o);
//   console.log("Daily high for " + code + ": " + body.h);
//   console.log("Daily low for " + code + ": " + body.l);
//   console.log("Current price for " + code + ": " + body.c);
//   console.log("_______________");
// });

// // Get general market news
// axios({
//   method: "GET",
//   url: "https://finnhub.io/api/v1/news?category=general&token=" + apiKey,
//   responseType: { json: true }
// }).then(body => {
//   console.log(body.headline);
//   console.log(body.summary);
// });
