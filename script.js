let keys = document.querySelectorAll(".calculator-keys button");
let screen = document.querySelector("#screen-input");

keys.forEach(function(key) {key.addEventListener("click", updateScreen)})
screen.addEventListener("input", evaluate);

let num1 = null;
let num2 = null;
let operator = null;

function evaluate() {
    screen.value = screen.value.replaceAll("*", "×");
    let value = screen.value;

    let isOperator = checkIfOperator(checkIfOperator(value[value.length - 1]));
    if (isOperator && checkIfOperator(value[value.length - 2])) {
        screen.value = value.slice(0, -1);
        value = screen.value;
    }

    
}

function checkIfOperator(lastChar) {
    if (lastChar == "+") return "+";
    if (lastChar == "-") return "-";
    if (lastChar == "×") return "×";
    if (lastChar == "/") return "/";
    return false;
}

function updateScreen() {
    let key = this.value;
    if (key == "all-clear") screen.value = ""
    else if (key == "backspace") screen.value = screen.value.slice(0, -1);
    else screen.value += key;
    evaluate();
}

function operate(operator, num1, num2) {
    return operator(num1, num2)
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}