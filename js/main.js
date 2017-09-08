let calculator = {
    screen: 0,
    userInput: [],
    stack: 0,

    init() {
        screen: 0,
        userInput = ['0'];
        stack = 0;
    },

    numberToScreen(button, screen) {

    }
}



let numberButtons = document.querySelectorAll('div.number');
let calculatorScreenEle = document.querySelector('.calculator-input');

numberButtons.forEach(button => {
    button.addEventListener('mouseup', getUserInput)
});

function getUserInput(e) {
    if (userInput.length >= 10)
        return;
    let num = (e.target.textContent);

    if (userInput[0] == 0 && userInput.length == 1) {
        if (num == 0) //ignores 0 input if it's the first number
            return;

        if (num != '.') { // change 0 to num if num!= 0
            userInput = [];
        }
    }

    //checks for existing '.' on screen
    if (num == '.' && userInput.indexOf('.') > -1)
        return;

    userInput.push(num);
    console.log(userInput);

    updateScreen();
}


function updateScreen() {
    screen.innerHTML = "";
    screen = userInput.join('');
    calculatorScreenEle.textContent = screen;
}



calculator.init();