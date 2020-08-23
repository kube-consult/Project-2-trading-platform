$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.card");
  const longCard = $("input#longCard-input");
  const expire = $("input#expire-input");
  const lastThree = $("input#lastThree-input");
  let userData;

  // When the signup button is clicked, we validate the lastThree and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    userData = {
      longNumber: longCard.val().trim(),
      expire: expire.val().trim(),
      lastThree: lastThree.val().trim()
    };
    console.log("test 5");

    if (!userData.longNumber || !userData.expire || !userData.lastThree) {
      return;
    }
    // If we have an lastThree and password, run the signUpUser function
    cards();
    longCard.val("");
    expire.val("");
    lastThree.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function cards() {
    $.post("/api/card", {
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
