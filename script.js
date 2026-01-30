const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let lastInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (button.id === 'clear') {
            currentInput = '';
            display.textContent = '0';
            resultDisplayed = false;
            return;
        }

        if (button.id === 'equals') {
            try {
                // Evaluate the expression safely
                currentInput = eval(currentInput).toString();
                display.textContent = currentInput;
                resultDisplayed = true;
            } catch {
                display.textContent = 'Error';
                currentInput = '';
            }
            return;
        }

        // Prevent multiple operators in a row
        if (['+', '-', '*', '/'].includes(value)) {
            if (resultDisplayed) {
                resultDisplayed = false;
            }
            if (currentInput === '') return;
            if (['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
                currentInput = currentInput.slice(0, -1);
            }
        }

        if (resultDisplayed && !['+', '-', '*', '/'].includes(value)) {
            currentInput = '';
            resultDisplayed = false;
        }

        currentInput += value;
        display.textContent = currentInput;
    });
});
