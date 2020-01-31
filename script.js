let currentValue = 0;
let storedValue = null;
let previousOperator = null;
let restartInput = true;
let allowOperation = false;
const displayLength = 11;
const display = document.querySelector('.display');

const numberKeys = document.querySelectorAll('.keys.number');
numberKeys.forEach((key) => key.addEventListener('click', (e) => printDisplay(e.target.firstChild.nodeValue)));

const operatorKeys = document.querySelectorAll('.keys.operators');
operatorKeys.forEach((key) => key.addEventListener('click', (e) => operate(e.target.id)));

const keys = document.querySelectorAll('.keys');
keys.forEach((key) => key.addEventListener('click', (e) => pressAnimation(e)));
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

document.getElementById('clear').addEventListener('click', () => clear());
document.getElementById('sign').addEventListener('click', () => changeSign());
document.getElementById('percent').addEventListener('click', () => displayPercentage());

function pressAnimation(e) {
    const targetBtn = document.getElementById(`${e.target.id}`);
    targetBtn.classList.add('pressed');
}

function removeTransition(e) {
    console.log(e.propertyName)
    if (e.propertyName !== 'background-color') return;
    this.classList.remove('pressed');
  }

function printDisplay(str) {
    if (typeof(str)!='string') {
        str = str.toString();
    }
    if (currentValue.toString().length < displayLength) {
        if (restartInput || currentValue == 0) {
            display.innerHTML = str;
            restartInput = false;
        } else {
            display.innerHTML += str;
        }
    }

    currentValue = Number(display.innerHTML);
    allowOperation = true;
}

function operate(operator) {

    if (allowOperation) {
        switch(previousOperator) {
            case 'add':
                currentValue = add(storedValue, currentValue);
                break;
            case 'subtract':
                currentValue = subtract(storedValue, currentValue);
                break;
            case 'multiply':
                currentValue = multiply(storedValue, currentValue);
                break;
            case 'divide':
                if (currentValue == 0) {
                    clear('Infinite');
                    return
                } else {
                    currentValue = divide(storedValue, currentValue);
                    break;
                }
                
            // else is 'equals' -> do nothing
        }
    }
    
    if (currentValue.toString().length < displayLength) {
        display.innerHTML = currentValue;
        previousOperator = operator;
        storedValue = currentValue; 
        restartInput = true;
        allowOperation = false;    
    } else {
        clear('Error');
    }    
}

function clear(displayText = '0') {
    display.innerHTML = displayText;
    currentValue = 0;
    storedValue = null;
    previousOperator = null;
    restartInput = true;
    allowOperation = false;
}

function changeSign() {
    if (currentValue != 0) {
        currentValue *= (-1);
        display.innerHTML = currentValue;
    }
}

function displayPercentage() {
    if (currentValue.toString().length < displayLength-2) {
        currentValue *= 0.01;
        display.innerHTML *= currentValue;
    } else {
        clear('Error');
    }
}

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}