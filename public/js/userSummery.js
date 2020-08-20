$(document).ready(() => {
  // Getting references to our form and input
  const buy = $("#input-trade");
  let userData;

  // When the signup button is clicked, we validate the email and password are not blank
  buy.on("click", event => {
    event.preventDefault();
    window.location.href = "/trade";
  });
});
