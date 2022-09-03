const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue ='0';
let firstValue = null;
let operator = null;
let waintingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click',function(e) {
    const element = e.target;

    if (!element.matches('button')) return;

    if(element.classList.contains('operator')) {
        // console.log('operator',element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }
    if(element.classList.contains('decimal')) {
       // console.log('decimal',element.value);
       inputDecimal(element.value);
       updateDisplay();
        return;
    }
    if(element.classList.contains('clear')) {
        // console.log('clear',element.value);
        clear();
        updateDisplay();
        return;
    }

   // console.log('number' , element.value);
    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(operator && waintingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue , value , operator);

        displayValue = String(result);
        firstValue = result;
    }

    waintingForSecondValue = true;
    operator = nextOperator;

    console.log({displayValue, firstValue, operator, waintingForSecondValue});
}

function calculate(first , second , operator) {
    if(operator ==='+') {
        return first + second;
    } else if (operator  === '-') {
        return first - second;
    } else if (operator === '*'){
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

function inputNumber(num) {
    if(waintingForSecondValue) {
        displayValue = num;
        waintingForSecondValue = false;
    } else {
         displayValue = displayValue === '0'? num: displayValue + num;
    }

    console.log({displayValue, firstValue, operator, waintingForSecondValue});

}

function inputDecimal() {
    if(!displayValue.includes('.')) {
        displayValue +='.';
    } 
}

function clear() {
    displayValue ='0';
}