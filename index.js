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

    if (fullName === "") {
      return { valid: false, message: "Full Name is required." };
    }
    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      return { valid: false, message: "A valid email is required." };
    }
    if (password === "") {
      return { valid: false, message: "Password is required." };
    }
    if (confirmPassword === "") {
      return { valid: false, message: "Please confirm your password." };
    }
    if (password !== confirmPassword) {
      return { valid: false, message: "Passwords do not match." };
    }
    if (phoneNumber === "") {
      return { valid: false, message: "Phone Number is required." };
    }
    if (dob === "") {
      return { valid: false, message: "Date of Birth is required." };
    }
    if (nationality === "0") {
      return { valid: false, message: "Please select your nationality." };
    }

    if (idType === "0") {
      return { valid: false, message: "Please select an ID type." };
    }

    return { valid: true };
  }

  function openPopup(message, isSuccess) {
    $("#popupMessage").text(message);
    if (isSuccess) {
      $("#popupImage").attr("src", "./public/tick.png");
      $("#popupHeader").text("Success");
    } else {
      $("#popupImage").attr("src", "./public/cross.png");
      $("#popupHeader").text("Error");
    }
    $("#popup").addClass("open-popup");
  }

  function closePopup() {
    $("#popup").removeClass("open-popup");
  }

  $("#okBtn").on("click", closePopup);

  $("#submitBtn").click(function (event) {
    event.preventDefault();
    const validation = isFormValid();
    if (validation.valid) {
      collectFormData();
      openPopup("Your details have been successfully submitted. Thanks!", true);
    } else {
      openPopup(validation.message, false);
    }
  });

  function collectFormData() {
    const formData = {
      fullName: $("#full-name").val().trim(),
      dob: $("#dob").val().trim(),
      nationality: $("#nationality").val(),
      email: $("#email").val().trim(),
      password: $("#password").val().trim(),
      phoneNumber: $("#phone-number").val().trim(),
      idType: $("#id-type").val(),
      confirmPassword: $("#confirm-password").val().trim(),
    };
    formDataArray.push(formData);
    localStorage.setItem("formData", JSON.stringify(formDataArray));
    console.log(formDataArray);
  }

  $(".btn-left").click(function (event) {
    event.preventDefault();
    $(this).closest("form")[0].reset(); // Reset the closest form element
  });
});
