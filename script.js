let keys = document.querySelectorAll(".calculator-keys button");
let screen = document.querySelector("#screen-input");
let screen_error = document.querySelector("#screen-error");
let history = document.querySelector("#history");

keys.forEach(function(key) {key.addEventListener("click", updateScreen)})
window.addEventListener("keydown", (e) => {
    if (e.key == "-") {
        e.preventDefault();
        screen.value += "–"
        evaluate();
    }
})
screen.addEventListener("input", evaluate);


let operators = ["+", "–", "/", "×", "="];

function evaluate() {
    screen_error.textContent = ""
    screen.value = screen.value.replaceAll("*", "×");
    let equation = screen.value;
    
    let doubleOperators = equation.slice(-2).split("").filter(char => operators.includes(char));
    if (doubleOperators.length == 2) equation = equation.slice(0,-2) + equation.slice(-1);

    const operatorsInString = equation.split("").filter(char => operators.includes(char));

    if(operatorsInString.length == 2) {
        equation = equation.slice(0, -1)

        let operator = operatorsInString[0];
        let num1 = equation.split(operator)[0];
        let num2 = equation.split(operator)[1];
        let result = operate(operator, num1, num2);
        result = Math.round((result + Number.EPSILON) * 100) / 100

        // Handle errors
        if (screen.value.slice(-1) != "=") equation += screen.value.slice(-1);
        if (isNaN(result)) {
            screen_error.textContent = "Learn how to write basic math";
        } else if (result == "Infinity") {
            screen_error.textContent = "Now you are just kidding";
        } else {
            addToHistory(equation.slice(0, -1), result);
            equation = result;
        }

        if (screen.value.slice(-1) != "=") equation += screen.value.slice(-1);
    } else {
        if (equation.slice(-1) == "=") {
            addToHistory(equation.slice(0, -1), equation.slice(0, -1));
            equation = equation.slice(0, -1);
        }
    }

    screen.value = equation;
}

function addToHistory(equation, result) {
    let container = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");

    div1.textContent = equation;
    div2.textContent = "=";
    div3.textContent = result;

    container.appendChild(div1);
    container.appendChild(div2);
    container.appendChild(div3);

    history.appendChild(container);
}

function updateScreen() {
    let key = this.value;
    if (key == "all-clear") screen.value = ""
    else if (key == "backspace") screen.value = screen.value.slice(0, -1);
    else screen.value += key;
    evaluate();
}

function operate(operator, a, b) {
    if (operator == "+") return add(a, b);
    if (operator == "–") return subtract(a, b);
    if (operator == "×") return multiply(a, b);
    if (operator == "/") return divide(a, b);
}

function add(a, b) {
    return +a + +b
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