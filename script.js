let keys = document.querySelectorAll(".calculator-keys button");
let screen = document.querySelector("#screen");

keys.forEach(function(key) {
    key.addEventListener("click", evaluate);
})

function evaluate() {
    
    updateScreen(this.value)
}

function updateScreen(key) {
    if (key == "all-clear") screen.value = ""
    else if (key == "backspace") screen.value = screen.value.slice(0, -1);
    else screen.value += key;
}

function operate(operator, num1, num2) {
    return operator(num1, num2)
}

function add(a, b) {
    return a + b;
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