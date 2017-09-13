let buttons = document.querySelectorAll('div.calc-button');
let numberButtons = document.querySelectorAll('div.number');
let calculatorScreenEle = document.querySelector('.calculator-input');
let operatorsEle = document.querySelectorAll('div.operator');
let equalsEle = document.querySelector('div.equals');


let screen = null;
let userInput = [];
let stack = null;
let operationInput = null;
let stackOperation = null;

function init() {
    screen: null,
    userInput = [];
    stack = null;
    operation: null;
    stackOperation: null;
};

function setHandlers() {

    numberButtons.forEach(button => {
        button.addEventListener('mouseup', numbersHandler)
    });

    operatorsEle.forEach(button => {
        button.addEventListener('mouseup', operatorHandler)
    });

    equalsEle.addEventListener('mouseup', equalsHandler);

    buttons.forEach(button => {
        button.addEventListener('mouseup', () => {
            let sound = new Audio('./audio/click.mp3');
            sound.volume = 0.4;
            sound.play();
        })
    })
}

function numbersHandler(e) {
    let num = e.target.textContent;

    if (userInput.length >= 10) //limit screen characters
        return;

    if (userInput[0] == 0 && userInput.length == 1) {
        if (num == 0) //ignores 0 input if it's the first number
            return;

        if (num != '.') { // changes 0 to num if num!= 0
            userInput = [];
        }
    }

    //checks for existing '.' on screen
    if (num == '.' && userInput.indexOf('.') > -1)
        return;

    userInput.push(num);
    updateScreen();
}

function operatorHandler(e) {
    // debugger;
    operationInput = e.target.textContent;
    let result;

    //detects 'C' cleaner
    if (operationInput == 'C') {
        init();
        updateScreen();
        return;
    }

    //Changes X to *
    if (operationInput == 'X')
        currentOperation = '*';
    else
        currentOperation = operationInput;

    // if screen is empty , do nothing
    if (screen == null || screen.length == 0)
        return;

    if (userInput == null || userInput.length == 0) {
        stackOperation = currentOperation;
        return;
    } else {
        if (stack != null) {
            result = doMath(stack, screen, stackOperation);
            stack = result;
            userInput = [];
            updateScreen(result)
        } else {
            stack = screen;
            stackOperation = currentOperation;
            userInput = [];
            updateScreen('');
        }

        if (stackOperation != null) {
            result = doMath(stack, screen, stackOperation);
            stackOperation = currentOperation;
        }
    }
}

function equalsHandler() {
    if (stack == null) return; // prevents 'bug' clicking equals twice

    let result = doMath(stack, screen, currentOperation);
    stack = null;
    stackOperation = null;
    updateScreen(result);
}

function doMath(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':

            return decimalFixer(a + b);
            break;
        case '-':
            return decimalFixer(a - b);
            break;
        case '*':
            return decimalFixer(a * b);
            break;
        case '/':
            return decimalFixer(a / b);
            break;
    }
}

function decimalFixer(num) {
    if (num.toString().indexOf('.') != -1)
        return num.toFixed(2)
    else return num;
}

function updateScreen(result) {

    if (arguments.length > 0)
        screen = result;
    else
        screen = userInput.join('');
    calculatorScreenEle.textContent = screen;
}

setHandlers();
init();