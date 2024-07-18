// Calculator Program

const display = document.getElementById("display");
let hasPrevCalculation = false; // if it had a previous calculation
let checkNextOperator = false; // check if the next value will be an operator
let memory = 0;

function memoryClear(){
    memory = 0;
}

function memoryRecall(){
    display.value = memory;
}

function memorySubstract(){
    memory += parseFloat(display.value);
}

function memoryAdd(){
    memory -= parseFloat(display.value);
}

function modM(){
    const [a, b] = display.value.split('%').map(Number);
    if(!isNaN(a) && !isNaN(b)){
        display.value = a % b;
    } else {
        display.value = 'Error';
    }
}

function power(base, exponent){
    if(exponent === 0) return 1;
    return base * power(base, exponent-1);
}

function calculatePower() {
    const [base, exponent] = display.value.split('^').map(Number);
    if (!isNaN(base) && !isNaN(exponent)) {
        display.value = power(base, exponent);
    } else {
        display.value = 'Error';
    }
}

function appendToDisplay(input){
    if(input == '+' || input == '-' || input == '*' || input == '/'){
        checkNextOperator = true;
    }

    if(hasPrevCalculation && checkNextOperator == false){ // if yes, then clear the display
        display.value = '';
        hasPrevCalculation = false;
    }

    display.value += input;
    checkNextOperator = false;
}

function clearDisplay(){
    display.value = "";
}

// After equals, everything starts
function calculate(){
    try{
        if(display.value.includes('^')){
            calculatePower();
        }
        if(display.value.includes('%')){
            modM();
        }
        display.value = eval(display.value);
        hasPrevCalculation = true; // mark it had a previous calculation
    }
    catch(error){
        display.value = "Error";
    }
}