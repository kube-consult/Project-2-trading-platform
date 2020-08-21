$(document).ready(() => {
  // Getting references to our form and input
  const trade = $("#input-trade");
  let userData;

  // When the signup button is clicked, we validate the email and password are not blank
  trade.on("click", event => {
    event.preventDefault();
    window.location.href = "/trade";
  });
});
