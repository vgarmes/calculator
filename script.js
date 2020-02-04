let currentValue = 0;
let storedValue = null;
let previousOperator = null;
let restartInput = true;
let allowOperation = false;
const displayLength = 11;
const display = document.querySelector('.display');

document.querySelectorAll('.keys.number').forEach((key) => key.addEventListener('click', (e) => printDisplay(e.target.firstChild.nodeValue)));
document.querySelectorAll('.keys.operators').forEach((key) => key.addEventListener('click', (e) => operate(e.target.id)));

const keys = document.querySelectorAll('.keys');
keys.forEach((key) => key.addEventListener('click', (e) => pressAnimation(e)));
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

document.getElementById('clear').addEventListener('click', () => clear());
document.getElementById('sign').addEventListener('click', () => changeSign());
document.getElementById('percent').addEventListener('click', () => displayPercentage());
document.getElementById('comma').addEventListener('click', () => addDecimal());

//keyboard support:
let keysPressed = {};

window.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;

    if (keysPressed['Shift']) {
        keyCode = `Shift${e.keyCode}`;
    } else {
        keyCode = e.keyCode;
    }
    console.log(e.keyCode)
    key = document.querySelector(`.keys[data-key="${keyCode}"]`);
    if (!key) return
    key.click();
});

window.addEventListener('keyup', (e) => {
    delete keysPressed[event.key];
});

window.addEventListener('keydown', (e) => {
    if (e.key == 'Backspace') {
        deleteNumber();
    }
});


function pressAnimation(e) {
    document.getElementById(`${e.target.id}`).classList.add('pressed');
}

function removeTransition(e) {
    if (e.propertyName !== 'background-color') return;
    this.classList.remove('pressed');
  }

function printDisplay(str) {
    if (typeof(str)!='string') {
        str = str.toString();
    }
    if (restartInput || display.innerHTLML == "0") {
        if (str != "0") {
            display.innerHTML = str;
            restartInput = false;
        }
        
    } else if (currentValue.toString().length <= displayLength) {
        display.innerHTML += str;
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
    } else {
        previousOperator = operator;
    }
    
    if (currentValue.toString().length <= displayLength) {
        display.innerHTML = currentValue;
        previousOperator = operator;
        storedValue = currentValue; 
        restartInput = true;
        allowOperation = false;    
    } else if ((currentValue.toString().indexOf(".") != -1) && 
        (currentValue.toString().indexOf(".")+1 <= displayLength-1)) {
        display.innerHTML = currentValue.toString().slice(0, displayLength);
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
        display.innerHTML = currentValue;
    } else {
        clear('Error');
    }
}

function addDecimal() {
    console.log("true")
    if (display.innerHTML.indexOf(".") == -1) {
        display.innerHTML += ".";
        restartInput = false;
    }
}

function deleteNumber() {
    restartInput = true;
    if (display.innerHTML.length > 1) {
        printDisplay(display.innerHTML.slice(0,-1));
    } else if (display.innerHTLML != 0) {
        printDisplay("0");
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