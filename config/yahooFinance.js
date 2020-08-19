var request = require("request");

var options = {
  method: 'GET',
  url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary',
  qs: {region: 'AU', lang: 'en'},
  headers: {
    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    'x-rapidapi-key': '312d1cbd8cmshe99614ad91b7c0ep1d96d1jsn09f75310538c',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

    console.log(body);
    response.toJSON
});