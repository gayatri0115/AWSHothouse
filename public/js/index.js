const errorMsg = document.getElementById("error-msg");
const signupButton = document.getElementById("registration-button");
const wrongPassword = document.getElementById("wrong-password");

signupButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const mobile = document.getElementById("mobile");
  const password = document.getElementById("password");
  const conformPassword = document.getElementById("conform-password");

  const inputs = document.querySelectorAll(".input-details");

  // removing empty class
  inputs.forEach((input) => {
    input.classList.remove("empty");
  });

  conformPassword.classList.remove("wrong-password");
  wrongPassword.style.display = "none";

  if (
    firstName.value != "" &&
    lastName.value != "" &&
    email.value != "" &&
    mobile.value != "" &&
    password.value != "" &&
    conformPassword.value != ""
  ) {
    errorMsg.style.display = "none";

    if (password.value != conformPassword.value) {
      conformPassword.classList.add("wrong-password");
      wrongPassword.style.display = "block";
    } else {
      // now everything is fine.
      // call backend api to post the user registration details.

      // console.log("Sending data to backend...");

      try {
        const result = await axios.post("http://localhost:4000/user/registration", {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          mobileNumber: mobile.value,
          password: password.value,
        });

        console.log(result);
        alert("User registration successfully.");
        window.location.assign("./login.html");
      } catch (err) {
        // console.log(err);
        if (err.message === "Request failed with status code 403") {
          alert("User Already Exists.");
        } else {
          alert("Something went wrong.");
        }
      }

      firstName.value = "";
      lastName.value = "";
      email.value = "";
      password.value = "";
      mobile.value = "";
      conformPassword.value = "";
    }
  } else {
    errorMsg.style.display = "block";

    const inputs = document.querySelectorAll(".input-details");

    // adding empty class to all the empty fields when clicked on signup button.
    inputs.forEach((input) => {
      if (input.value === "") {
        input.classList.add("empty");
      }
    });
  }
});
