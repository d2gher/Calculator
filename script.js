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
    if(screen.value.slice(-1) == ".") addDismal();

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
        } else if (result == "Infinity" || result == "-Infinity") {
            screen_error.textContent = "Now you are just kidding";
        } else {
            addToHistory(equation, result);
            equation = result;
        }
        // Add the last operator pressed if it was not Equal
        if (screen.value.slice(-1) != "=") equation += screen.value.slice(-1);
    } else {
        // Do operation if there is no operators and Equal has been pressed
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
    else if (key == "±") addPlusMinus();
    else screen.value += key;
    evaluate();
}

function addPlusMinus() {
    let value = screen.value;
    let operatorFound = -1;
    let minusFound = -1;

    for(let i = value.length -1; i >= 0; i--) {
        if (operators.includes(value[i])) {
            operatorFound = i;
            break;
        }
        if (value[i] == "-") minusFound = i;
    }
    
    if (operatorFound == -1 && minusFound == -1) value = "-" + value;
    else if (operatorFound != -1 && minusFound != -1) value = value.removeAt(operatorFound + 1);
    else if (operatorFound == -1 && minusFound != -1) value = value.removeAt(minusFound);
    else if (operatorFound != -1 && minusFound == -1) value = value.replaceAt(operatorFound + 1, "-" + value[operatorFound + 1]);
    screen.value = value;
}

function addDismal() {
    let value = screen.value.slice(0, -1);
    let dismalFound = -1;

    for(let i = value.length -1; i >= 0; i--) {
        if (operators.includes(value[i])) {
            break;
        }
        if (value[i] == ".") dismalFound = i;
    }
    
    if (dismalFound == -1) value += ".";
    screen.value = value;
}

function operate(operator, a, b) {
    if (operator == "+") return add(a, b);
    if (operator == "–") return subtract(a, b);
    if (operator == "×") return multiply(a, b);
    if (operator == "/") return divide(a, b);
}

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

String.prototype.removeAt = function(index) {
    let arr = this.split("");
    arr.splice(index, 1);
    return arr.join("");
}

