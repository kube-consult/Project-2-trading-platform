$(document).ready(() => {
  // Getting references to our form and input
  const buy = $("#input-buy");
  const searchgo = $("#input-search");
  const code = $("input#code-input");
  //const Company = $("input#company-input");
  const PurchasePrice = $("input#purchasePrice-input");
  const SoldPrice = $("input#units-input");
  let userData;
  // When the signup button is clicked, we validate the email and password are not blank
  console.log("test13");

  buy.on("click", event => {
    event.preventDefault();
    console.log("test14");
    userData = {
      Code: "DYD",
      Company: "Dumb",
      PurchasePrice: 10,
      SoldPrice: "",
      Units: 30,
      Watched: 0
      //Code: code.val().trim(),
      //Company: company.val().trim(),
      //PurchasePrice: PurchasePrice.val().trim(),
      //SoldPrice: soldPrice.val().trim(),
      //Units: Units.val().trim(),
      //Watched: Watched.val().trim()
    };

    if (
      !userData.Code ||
      !userData.Company ||
      !userData.PurchasePrice ||
      !userData.Units
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    purchase();
    code.val("");
    Company.val("");
    PurchasePrice.val("");
    SoldPrice.val("");
    Units.val("");
    Watched.val("");
  });

  searchgo.on("click", event => {
    event.preventDefault();
    const value = $("input#search-input");
    const input = value.val().trim();
    console.log(input);
    const URL =
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/financial-data";
    $.ajax({
      url: URL,
      type: 'GET',
      dataType: "json",
      headers: {
        "Accept": "application/json",
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        "x-rapidapi-key": "435f0cdaeamshd0fe4e59b8a1c27p16ae90jsn8bb53a2736cc"
      },
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        console.log(result);
        console.log("test", result.financialData);
        console.log("test", result.financialData.currentPrice.fmt);
        console.log("test", result.financialData.debtToEquity.fmt);
        console.log("test", result.financialData.grossProfits.fmt);
        console.log("test", result.financialData.recommendationKey);
        console.log("test", result.financialData.grossMargins.fmt);
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function purchase() {
    console.log("test12");
    $.post("/api/buy", {
      data: userData
    })
      // eslint-disable-next-line no-empty-function
      .then(() => {
        window.location.replace("/trade");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
