$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstInput = $("input#first-input");
  const lastInput = $("input#last-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const addressInput = $("input#address-input");
  let userData;

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    userData = {
      first: firstInput.val().trim(),
      last: lastInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      address: addressInput.val().trim()
    };

    if (
      !userData.first ||
      !userData.last ||
      !userData.email ||
      !userData.password ||
      !userData.address
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser();
    firstInput.val("");
    lastInput.val("");
    emailInput.val("");
    passwordInput.val("");
    addressInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser() {
    $.post("/api/signup", {
      data: userData
    })
      // eslint-disable-next-line no-empty-function
      .then(() => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
