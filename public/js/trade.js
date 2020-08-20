$(document).ready(() => {
  // Getting references to our form and input
  const buy = $("#input-buy");
  const code = $("input#code-input");
  const company = $("input#company-input");
  const PurchasePrice = $("input#purchasePrice-input");
  const SoldPrice= $("input#units-input");
  const watched = $("input#watched-input");
  let userData;
  // When the signup button is clicked, we validate the email and password are not blank
  let userData;

  // When the signup button is clicked, we validate the email and password are not blank
  buy.on("submit", event => {
    event.preventDefault();
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
      !userData.code ||
      !userData.company ||
      !userData.PurchasePrice||
      !userData.units
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

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function purchase() {
    $.post("/api/buy", {
      data: userData
    })
      // eslint-disable-next-line no-empty-function
      .then(() => {
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
