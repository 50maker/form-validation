document
  .getElementById("signInBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const signInEmail = document.getElementById("signInEmail").value;
    const signInPassword = document.getElementById("signInPassword").value;

    const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];

    const user = storedFormData.find(
      (data) => data.email === signInEmail && data.password === signInPassword
    );

    if (user) {
      alert("Sign-in successful!");
    } else {
      alert("Invalid email or password.");
    }
  });
