$(document).ready(() => {
  const buy = $("#input-buy");
  const watch = $("#input-watch");
  const searchgo = $("#input-search");
  const units = $("input#stock-input");
  let userData;
  let stockBuy;
  let stockPrice;

  // When the signup button is clicked, we validate the email and password are not blank
  console.log("test13");

  buy.on("click", event => {
    event.preventDefault();
    console.log("test14");
    const uni = units.val().trim();
    userData = {
      Code: stockBuy,
      Company: stockBuy,
      PurchasePrice: stockPrice,
      SoldPrice: 0,
      Units: uni,
      Watched: 0
    };
    console.log(userData);

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
    searchgo.val("");
    units.val("");
  });

  watch.on("click", event => {
    event.preventDefault();
    console.log("test14");
    userData = {
      Code: stockBuy,
      Company: stockBuy,
      PurchasePrice: 0,
      SoldPrice: 0,
      Units: 0,
      Watched: 1
    };
    console.log(userData);

    if (!userData.Code || !userData.Company) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    purchase();
    searchgo.val("");
    units.val("");
  });

  searchgo.on("click", event => {
    event.preventDefault();
    $("#results").empty();
    $("#stock-name").empty();
    const value = $("input#search-input");
    stockBuy = value.val().trim();
    console.log(stockBuy);
    const URL =
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/" +
      stockBuy +
      "/financial-data";
    $.ajax({
      url: URL,
      type: "GET",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        "x-rapidapi-key": "435f0cdaeamshd0fe4e59b8a1c27p16ae90jsn8bb53a2736cc"
      },
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        stockPrice = result.financialData.currentPrice.fmt;

        $("<h3>", {
          html: stockBuy
        }).appendTo($("#stock-name"));

        const arr = [
          {
            name: "CurrentPrice",
            value: result.financialData.currentPrice.fmt
          },
          {
            name: "debt To Equity",
            value: result.financialData.debtToEquity.fmt
          },
          {
            name: "Gross Profits",
            value: result.financialData.grossProfits.fmt
          },
          {
            name: "Recomendation",
            value: result.financialData.recommendationKey
          },
          {
            name: "Gross Margins",
            value: result.financialData.grossMargins.fmt
          }
        ];
        arr.forEach(element => {
          $("<tr>", {})
            .append(
              $("<th>", {
                //scope: "row"
              }),
              $("<td>", {
                text: element.name
              }),
              $("<td>", {
                text: element.value
              })
            )
            .appendTo($("#results"));
        });
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  function purchase() {
    console.log("test12");
    $.post("/api/buy", {
      data: userData
    })
      // eslint-disable-next-line no-empty-function
      .then(() => {
        window.location.replace("/userSummery");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
