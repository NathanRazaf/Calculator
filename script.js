const addButton = document.getElementById('add')
const subButton = document.getElementById('sub')
const multiplyButton = document.getElementById('multiply')
const divideButton = document.getElementById('divide')
const equals = document.getElementById('equals')
const screen = document.getElementById('screen')

const numbers = document.querySelectorAll('.numbers')
const dot = document.getElementById("dot")
const operands = document.querySelectorAll('.operands')
const deleteButton = document.getElementById('delete')
const clearButton = document.getElementById('clear')
screen.textContent = "0"

var num1 = ""
var num2 = ""
var temo = ""
var operand = ""

var isNewOp=true
var isOperating = false

function add(x,y) {
    return x+y;
}

function sub(x,y) {
    return x-y;
}

function multiply(x,y) {
    return x*y;
}

function divide(x,y) {
    if (y==0) {
        return "Nice try"
    }
    return Math.floor(x/y *1000)/1000;
}

function writeNumber(e) {
    var text = e.target.textContent;
    var number = this;
    if (text == ".") {
        if (!number.includes(".")) {
            number += text;
        }
    } else {
        number += text;
    }
    return number;
}


function writeRightNumber(e) {
    if (isNewOp) {
        num1="";
        isNewOp=false;
    }
    if (!isOperating) {
        num1 = writeNumber.call(num1, e);
        screen.textContent = num1;
    } else {
        num2 = writeNumber.call(num2, e);
        screen.textContent = num2;
    }
}


function calculate() {
    if (num1 == "") {
        num1=temp;
    }
    switch (operand) {
        case "+":
            num1=add(parseFloat(num1),parseFloat(num2)).toString();
            break;
        case "-":
            num1=sub(parseFloat(num1),parseFloat(num2)).toString();
            break;
        case "*":
            num1=multiply(parseFloat(num1),parseFloat(num2)).toString();
            break;
        case "÷":
            num1=divide(parseFloat(num1),parseFloat(num2)).toString();
            break;
    }
}

function manageOperand(e) {
    if (isOperating) {
        if (num2=="") {
            operand=e.target.textContent;
        }
        else {
            manageEquals();
            isNewOp=false;
        }
    }
    operand=e.target.textContent;
    isOperating=true;
}

function manageEquals() {
    calculate();
    screen.textContent=num1;
    operand="";
    num2="";
    isOperating=false;
    isNewOp=true;
    temp=num1;
}

function backspace() {
    if (!isOperating) {
        num1=num1.slice(0,-1);
        screen.textContent=num1;
    }
    else {
        num2=num2.slice(0.-1);
        screen.textContent=num2;
    }
}

function clear() {
    num1="";
    operand="";
    num2="";
    temp="";
    isOperating=false;
    isNewOp=true;
    screen.textContent="0";
}

numbers.forEach(number => number.addEventListener("click", writeRightNumber))    
operands.forEach(operand => operand.addEventListener("click", manageOperand))
equals.addEventListener("click", manageEquals)
deleteButton.addEventListener("click", backspace)
clearButton.addEventListener("click", clear)