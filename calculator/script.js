// Calculator variables
let currentInput = '';
let currentResult = 0;
let operator = '';
let history = [];

// Display elements
const display = document.getElementById('output');
const historyList = document.getElementById('history-list');

// Function to update the calculator display
function updateDisplay() {
    display.value = currentInput;
}

// Function to perform calculations
function calculate() {
    const num1 = parseFloat(history[history.length - 2]);
    const num2 = parseFloat(currentInput);
    switch (operator) {
        case '+':
            currentResult = num1 + num2;
            break;
        case '-':
            currentResult = num1 - num2;
            break;
        case '*':
            currentResult = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                currentResult = num1 / num2;
            } else {
                alert('Error: Division by zero');
                clearAll();
                return;
            }
            break;
    }
    currentInput = currentResult.toString();
    history.push(currentInput);
    operator = '';
    updateDisplay();
}

// Function to clear the calculator
function clearAll() {
    currentInput = '';
    currentResult = 0;
    operator = '';
    history = [];
    updateDisplay();
    historyList.innerHTML = '';
}

// Event listener for calculator buttons
document.querySelectorAll('.number, .operator').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        if (!isNaN(value) || value === '.') {
            currentInput += value;
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (operator) {
                calculate();
            }
            operator = value;
            history.push(currentInput);
            history.push(operator);
            currentInput = '';
        } else if (value === '=') {
            if (operator) {
                calculate();
                history.push('=');
                historyList.innerHTML = `<li>${history.join(' ')}</li>` + historyList.innerHTML;
            }
        } else if (value === 'C') {
            clearAll();
        }
        updateDisplay();
    });
});

// Event listener for history clear button
document.getElementById('clear-history').addEventListener('click', () => {
    historyList.innerHTML = '';
});

// Initial update of the calculator display
updateDisplay();
