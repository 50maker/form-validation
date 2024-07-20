document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signInBtn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const signInEmail = document.getElementById("signInEmail").value.trim();
      const signInPassword = document
        .getElementById("signInPassword")
        .value.trim();

      const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];

      const user = storedFormData.find(
        (data) => data.email === signInEmail && data.password === signInPassword
      );

      const popup = document.getElementById("popup");
      const popupMessage = document.getElementById("popupMessage");
      const popupImage = document.getElementById("popupImage");
      const popupTitle = document.getElementById("popupTitle");

      if (user) {
        popupMessage.innerText = "Sign-in successful!";
        popupImage.src = "./public/tick.png";
        popupTitle.innerText = "Success";
      } else {
        popupMessage.innerText = "Invalid email or password.";
        popupImage.src = "./public/cross.png";
        popupTitle.innerText = "Error";
      }

      popup.classList.add("open-popup");
    });

  document.getElementById("okBtn").addEventListener("click", function () {
    document.getElementById("popup").classList.remove("open-popup");
  });
});
