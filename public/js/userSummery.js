$(document).ready(() => {
  // Getting references to our form and input
  const trade = $("#input-trade");

  // When the signup button is clicked, we validate the email and password are not blank
  trade.on("click", event => {
    event.preventDefault();
    window.location.href = "/trade";
  });

  // Getting references to our form and input
  const invest = $("#input-invest");

  // When the signup button is clicked, we validate the email and password are not blank
  invest.on("click", event => {
    event.preventDefault();
    window.location.href = "/cards";
  });
});
