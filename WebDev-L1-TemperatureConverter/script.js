
// Get HTML elements
const form = document.getElementById("converter-form");

const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");

const resultBox = document.getElementById("result-box");
const resultValue = document.getElementById("result-value");
const resultDescription = document.getElementById("result-description");

const errorMessage = document.getElementById("error-message");
const resetButton = document.getElementById("reset-btn");


// Temperature conversion function
function convertTemperature(value, from, to) {

    let celsius;

    // First convert the input to Celsius
    if (from === "Celsius") {
        celsius = value;
    }

    else if (from === "Fahrenheit") {
        celsius = (value - 32) * 5 / 9;
    }

    else if (from === "Kelvin") {
        celsius = value - 273.15;
    }


    // Then convert Celsius to the selected output unit
    if (to === "Celsius") {
        return celsius;
    }

    else if (to === "Fahrenheit") {
        return (celsius * 9 / 5) + 32;
    }

    else if (to === "Kelvin") {
        return celsius + 273.15;
    }

}


// Handle form submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const value = Number(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;


    // Validate empty input
    if (temperatureInput.value.trim() === "") {
        showError("Please enter a temperature.");
        return;
    }


    // Validate numeric input
    if (!Number.isFinite(value)) {
        showError("Please enter a valid numeric temperature.");
        return;
    }


    // Convert the entered temperature to Celsius for validation
    let celsius;

    if (from === "Celsius") {
        celsius = value;
    }

    else if (from === "Fahrenheit") {
        celsius = (value - 32) * 5 / 9;
    }

    else if (from === "Kelvin") {
        celsius = value - 273.15;
    }


    // Validate absolute zero
    if (celsius < -273.15) {
        showError(
            "Temperature cannot be below absolute zero (-273.15 °C)."
        );
        return;
    }


    // Perform conversion
    const result = convertTemperature(value, from, to);


    // Format result to avoid excessive decimal places
    const formattedResult = Number(result.toFixed(4));

    const symbols = {
        Celsius: "°C",
        Fahrenheit: "°F",
        Kelvin: "K"
    };


    // Display result
    errorMessage.style.display = "none";

    resultBox.style.display = "block";

    resultValue.textContent =
        formattedResult + " " + symbols[to];

    resultDescription.textContent =
        value + " " + symbols[from] +
        " is equal to " +
        formattedResult + " " + symbols[to];

});


// Display error messages
function showError(message) {

    errorMessage.textContent = message;

    errorMessage.style.display = "block";

    resultValue.textContent = "--";

    resultDescription.textContent =
        "Please correct the input and try again.";

}


// Reset converter
resetButton.addEventListener("click", function() {

    form.reset();

    errorMessage.style.display = "none";

    resultValue.textContent = "--";

    resultDescription.textContent =
        "Your converted temperature will appear here.";

});


// Automatically update copyright year
document.getElementById("current-year").textContent =
    new Date().getFullYear();
