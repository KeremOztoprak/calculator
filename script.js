const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue ='0';
let firstValue = null;
let oparetor = null;
let waintingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click',function(e) {
    const element = e.target;

    if (!element.matches('button')) return;

    if(element.classList.contains('oparetor')) {
        // console.log('operator',element.value);
        handleOperator(element.value);
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

function handleOperator(nextOparetor) {
    const value = parseFloat(displayValue);

    if (firstValue === null) {
        firstValue = value;
    }

    waintingForSecondValue = true;
    oparetor = nextOparetor;

    console.log(displayValue, firstValue, oparetor, waintingForSecondValue);
}

function inputNumber(num) {
    if(waintingForSecondValue) {
        displayValue = num;
        waintingForSecondValue = false;
    } else {
         displayValue = displayValue === '0'? num: displayValue + num;
    }

    console.log(displayValue, firstValue, oparetor, waintingForSecondValue);

}

function inputDecimal() {
    if(!displayValue.includes('.')) {
        displayValue +='.';
    } 
}

function clear() {
    displayValue ='0';
}