let currentNumber = "0";
let previousNumber = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const history = document.getElementById("history");


function updateDisplay() {
    display.value = currentNumber;
}


function appendNumber(number) {

    if (shouldResetDisplay) {
        currentNumber = "0";
        shouldResetDisplay = false;
    }

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


function chooseOperator(selectedOperator) {

    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }

    previousNumber = parseFloat(currentNumber);
    operator = selectedOperator;
    shouldResetDisplay = true;

    history.textContent =
        previousNumber + " " + getOperatorSymbol(selectedOperator);
}


function calculate() {

    if (operator === null || previousNumber === null) {
        return;
    }

    const current = parseFloat(currentNumber);
    let result;

    switch (operator) {

        case "+":
            result = previousNumber + current;
            break;

        case "-":
            result = previousNumber - current;
            break;

        case "*":
            result = previousNumber * current;
            break;

        case "/":
            if (current === 0) {
                currentNumber = "Error";
                updateDisplay();
                resetCalculator();
                return;
            }

            result = previousNumber / current;
            break;
    }

    history.textContent =
        previousNumber + " " +
        getOperatorSymbol(operator) +
        " " + current + " =";

    currentNumber = formatResult(result);

    operator = null;
    previousNumber = null;
    shouldResetDisplay = true;

    updateDisplay();
}


function percentage() {

    let number = parseFloat(currentNumber);

    number = number / 100;

    currentNumber = formatResult(number);

    updateDisplay();
}


function deleteLast() {

    if (currentNumber.length === 1) {
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }

    updateDisplay();
}


function clearDisplay() {

    currentNumber = "0";
    previousNumber = null;
    operator = null;
    shouldResetDisplay = false;

    history.textContent = "";

    updateDisplay();
}


function resetCalculator() {

    previousNumber = null;
    operator = null;
    shouldResetDisplay = true;
}


function formatResult(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }

    return parseFloat(number.toFixed(10)).toString();
}


function getOperatorSymbol(op) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[op];
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    if (!isNaN(event.key) || event.key === ".") {
        appendNumber(event.key);
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteLast();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }

});