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


