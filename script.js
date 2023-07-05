let display = document.querySelector('.display');
let plusOrMinus = document.querySelector('.plusOrMinus');
let cleanScr = document.querySelector('.clean');
let backspace = document.querySelector('.backspace');
let dot = document.querySelector('.dot-button');
var digitButtons = document.querySelectorAll('.digit-button'); 

for (var i = 0; i < digitButtons.length; i++) {
    digitButtons[i].addEventListener('click', function(event) {
    var digit = event.currentTarget.textContent;
    display.textContent = display.textContent + digit;
    if (operand1 && operator) {
        operand2 = operand2 + digit;
            if (operand2 == '0' && operator == '/') {
                cleanEverything();
                display.textContent = "ERROR";
            };
    } else {
            if (operand1 == result) {
                operand1 = '';
                display.textContent = digit;
            };
        operand1 = operand1 + digit;
    };
  });
}

var operatorButtons = document.querySelectorAll('.operator-button');
for (var i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function(event){
        var currentOperator = event.currentTarget.textContent;
        operator = currentOperator;
        display.textContent = '';
    })
}

let equal = document.querySelector('.equal');
equal.addEventListener('click', function(){
    display.textContent = '';
    result = operate(operand1, operator, operand2);

    //если у числа слишком большой остаток, обрезаем его
    let strResult = result.toString();
    if ( strResult.indexOf('.') != -1) { 
        var reminderPlace = strResult.indexOf('.');
        var reminder = strResult.slice( (reminderPlace + 1), );
        if (reminder > 9999) result = result.toFixed(4);
    }
    //

    if (result > 99999999){
        cleanEverything();
        display.textContent = "too big number";
    };

    display.textContent = result;
    operand1 = result;
    operand2 = '';
    operator = '';
} )

cleanScr.addEventListener('click', function(){
    cleanEverything();
})

plusOrMinus.addEventListener('click', function(){
    if (operator) {
        operand2 = operand2 * (-1);
        display.textContent = operand2;
    } else {
        operand1 = operand1 * (-1);
        display.textContent = operand1;
    };
})

dot.addEventListener('click', function(){
    if (operator) {
        operand2 = addDot(operand2);
        display.textContent = operand2;
    } else {
        operand1 = addDot(operand1);
        display.textContent = operand1;
    };
})

function addDot(operand){
    operand = operand.toString();

    if (operand.indexOf(".") > 0){
        return operand;
    };
    operand = operand + '.';
    console.log(operand);
    return operand;
}

backspace.addEventListener('click', function(){
    if (operator) {
        operand2 = cutLastNumber(operand2);
        display.textContent = operand2;
    } else {
        operand1 = cutLastNumber(operand1);
        display.textContent = operand1;
    };
})

function cutLastNumber(operand){
    operand = operand.toString();
    operand = operand.slice(0, -1);
    operand = Number(operand);
    return operand;
}

let operand1 = '';
let operator;
let operand2 = '';
let result;

function add(operand1, operand2){
    return operand1 + operand2;
}
function subtract(operand1, operand2){
    return operand1 - operand2;
}
function multiply(operand1, operand2){
    return operand1 * operand2;
}
function divide(operand1, operand2){
    return operand1 / operand2;
}

function operate(operand1, operator, operand2){
    operand1 = Number(operand1);
    operand2 = Number(operand2);


    switch (operator) {
  case "+":
    return add(operand1, operand2)
  case "-":
    return subtract(operand1, operand2)
  case "*":
    return multiply(operand1, operand2)
  case "/":
    return divide(operand1, operand2)
    }
}

function cleanEverything(){
    operand1 = '';
    operand2 = '';
    operator = '';
    result = '';
    display.textContent = '';
}