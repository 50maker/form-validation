$(document).ready(function () {
  let formDataArray = [];

  // Fetching countries from Rest Countries
  function populateCountries() {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((countries) => {
        const nationalitySelect = $("#nationality");
        countries.forEach((country) => {
          const option = $("<option></option>").text(country.name.common);
          nationalitySelect.append(option);
        });
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }

  populateCountries();

  function isFormValid() {
    const fullName = $("#full-name").val().trim();
    const dob = $("#dob").val().trim();
    const nationality = $("#nationality").val();
    const password = $("#password").val().trim();
    const email = $("#email").val().trim();
    const phoneNumber = $("#phone-number").val().trim();
    const idType = $("#id-type").val();
    const confirmPassword = $("#confirm-password").val().trim();

    if (
      fullName === "" ||
      dob === "" ||
      nationality === "0" ||
      password === "" ||
      email === "" ||
      !/\S+@\S+\.\S+/.test(email) ||
      phoneNumber === "" ||
      idType === "0" ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      return false;
    }
    return true;
  }

  function openPopup() {
    if (isFormValid()) {
      collectFormData();
      $("#popup").addClass("open-popup");
    } else {
      alert("Please fill in all fields correctly.");
    }
  }

  function closePopup() {
    $("#popup").removeClass("open-popup");
  }

  $("#okBtn").on("click", closePopup);

  $("#submitBtn").click(function (event) {
    event.preventDefault();
    openPopup();
  });

  function collectFormData() {
    const formData = {
      fullName: $("#full-name").val().trim(),
      dob: $("#dob").val().trim(),
      nationality: $("#nationality").val(),
      password: $("#password").val().trim(),
      email: $("#email").val().trim(),
      phoneNumber: $("#phone-number").val().trim(),
      idType: $("#id-type").val(),
      confirmPassword: $("#confirm-password").val().trim(),
    };
    formDataArray.push(formData);
    localStorage.setItem("formData", JSON.stringify(formDataArray));
    console.log(formDataArray);
  }
});
