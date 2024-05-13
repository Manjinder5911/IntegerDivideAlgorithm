var CalculateResult = document.getElementById("CalculateResult");
var dividend = document.getElementById("dividend");
var divisor = document.getElementById("divisor");
var dividendNegative = false;
var divisorNegative = false;
var quotientResult = document.getElementById("quotientResult");
var remainderResult = document.getElementById("remainderResult");
var resultDiv = document.getElementById("resultDiv");


//error variables
var dividendEntryError = document.getElementById("dividendEntryError");
var divisorEntryError = document.getElementById("divisorEntryError");


// validating for only int values
var inputCalculation = document.querySelectorAll(".inputCalculation");
inputCalculation.forEach((element,index)=>{
    //only letting users enter integer values
    element.addEventListener('keydown',(ev)=>{
        let key = ev.key;
        let result = true;
        if(key === "."){
            result = false;
        }
        if(result == false){
            ev.preventDefault();
        }
    })
})


//input fields in divison diagram which show the binay values in registers
var divisorValue = document.getElementById("divisorValue");
var quotientValue = document.getElementById("quotientValue");
var remainderValue = document.getElementById("remainderValue");
 
//iteration count and divisobObj that stores all the iterations performed during calculation
var iterationCount = 0;
var iterationSubCount;
//divisonObj = {1:{1:["StepValue","value1",value2,value3]}} This is how values will be stored
var divisonObj = {};
var binaryDivisor,binaryQuotient,binaryRemainder;

//btns for next and previous animation and Iteration number show variables
var iterationDiv = document.getElementById("iterationDiv");
var iterationValue = document.getElementById("iterationValue");
var subIterationValue = document.getElementById("subIterationValue");
var previousBtn = document.getElementById("previousBtn");
var nextBtn = document.getElementById("nextBtn");
var btnIndex = 0,subIndex = 0;

//algorithm add color to steps
var startValue = document.getElementById("startValue");
var step1Highlight = document.getElementById("step1Highlight");
var step2aHighlight = document.getElementById("step2aHighlight");
var step2bHighlight = document.getElementById("step2bHighlight");
var step3Highlight = document.getElementById("step3Highlight");
var doneHighlight = document.getElementById("doneHighlight");
var colorClass = document.querySelectorAll(".colorClass");

//Function to convert integer remainder into 8 bit binary
function intTo8BitBinaryRemainder(number) {
    // Convert the number to binary string
    let binaryString = (number >>> 0).toString(2);
    
    // Pad the binary string with leading zeros if necessary to make it 8 bits long
    while (binaryString.length < 8) {
        binaryString = '0' + binaryString;
    }
    
    // Return the 8-bit binary representation
    return binaryString;
}
function intTo8BitBinaryDivisor(number) {
    // Convert the number to binary string
    let binaryString = (number >>> 0).toString(2);
    
    //check if the string has 4 bit values in the first half of divisor
    while (binaryString.length < 4) {
        binaryString = '0' + binaryString;
    }
    // Pad the binary string with leading zeros if necessary to make it 8 bits long
    while(binaryString.length<8){
        binaryString = binaryString+'0';
    }
    // Return the 8-bit binary representation
    return binaryString;
}


//validate first inputs and then calculate result
CalculateResult.addEventListener('click',()=>{
    dividendEntryError.innerText="";
    divisorEntryError.innerText="";
    // check if the inputs meet all the requirements
    if((divisor.value!="")&&(dividend.value1!="")&&(parseInt(dividend.value)<=7)&&(parseInt(dividend.value)>=-7)&&(parseInt(divisor.value)<=7)&&
    (parseInt(divisor.value)>=-7)&&(parseInt(divisor.value) != 0)){
        //if values are negative
        
        if(Math.abs(parseInt(dividend.value))<Math.abs(parseInt(divisor.value))){
            resultDiv.style.display = "block";
            // quotientResult.innerText = `${parseInt(divisonObj[Object.keys(divisonObj).length-1][3][3], 2)}`;
            quotientResult.innerText = "0";
            remainderResult.innerText = dividend.value;
        }
        else{
    
        
        binaryDivisor = intTo8BitBinaryDivisor(Math.abs(parseInt(divisor.value)));
        binaryRemainder = intTo8BitBinaryRemainder(Math.abs(parseInt(dividend.value)));
        binaryQuotient = "0000";
        divisonObj = {};
        iterationCount = 0;
        divisonObj[iterationCount] = {1:[binaryDivisor,binaryRemainder,binaryQuotient]};
        iterationCount++;

        //send to first step;
        Step1(binaryDivisor,binaryRemainder);

        //show the quotient value and remainder value in int form
        resultDiv.style.display = "block";
       
        //check if the dividend,divisor values are negative
        if(parseInt(dividend.value)<0){
            dividendNegative = true;
        }
        if(parseInt(divisor.value)<0){
            divisorNegative = true;
        }

        // Show remainder and quotient signs according to dividend and divisor
        //dividend negative and divisor positive
        if(!divisorNegative && dividendNegative){
            quotientResult.innerText = `-${parseInt(binaryQuotient,2)}`;
            remainderResult.innerText = `-${parseInt(divisonObj[Object.keys(divisonObj).length-1][3][2], 2)}`;
        }
        else if(divisorNegative&&dividendNegative){
            quotientResult.innerText = `${parseInt(binaryQuotient,2)}`;
            remainderResult.innerText = `-${parseInt(divisonObj[Object.keys(divisonObj).length-1][3][2], 2)}`;
        }
        else if(divisorNegative && !dividendNegative){
            quotientResult.innerText = `-${parseInt(binaryQuotient,2)}`;
             remainderResult.innerText = `${parseInt(divisonObj[Object.keys(divisonObj).length-1][3][2], 2)}`;
        }
        else{
            quotientResult.innerText = `${parseInt(binaryQuotient,2)}`;
            remainderResult.innerText = `${parseInt(divisonObj[Object.keys(divisonObj).length-1][3][2], 2)}`;
        }
        
        //send initial values to diagram
        divisorValue.value = addSpaceAfterFourthLetter(divisonObj[0][1][0]);
        // quotientValue.value = addSpaceAfterFourthLetter(divisonObj[0][1][2]);
        remainderValue.value = addSpaceAfterFourthLetter(divisonObj[0][1][1]);
        quotientValue.value  = "0000";
        //show next and prev btn
        nextBtn.style.display = "block";

        btnIndex = 0;subIndex = 0;
        //also show the iteration number div
        iterationDiv.style.display = "block";
        iterationValue.innerText = `${btnIndex}`;
        subIterationValue.innerText = `${subIndex}`;
        //add color to start
        colorClass[0].style.background = "#47b04a8f";


        btnIndex = 1;
        subIndex = 0;
}
    }
    // error for empty inputs
    else if(divisor.value==""){
        divisorEntryError.innerText = "Required";
    }
    else if(dividend.value==""){
        dividendEntryError.innerText = "Required";
    }
    //range error
    else if((parseInt(dividend.value)>7)||(parseInt(dividend.value)<-7)){
        dividendEntryError.innerText = "Out of range (-7 to 7)";
    }
    else if((parseInt(divisor.value)>7 )|| (parseInt(divisor.value)<-7)){
        divisorEntryError.innerText = "Out of range (-7 to 7)";
    }
    else if(parseInt(divisor.value) == 0){
        divisorEntryError.innerText = "Divisor can't be zero";
    }
    else{
        dividendEntryError.innerText = "Unknown error occurred";
    }
    
});


//function to add space to binary string after 4 letters
function addSpaceAfterFourthLetter(word) {
    let result = '';
    for (let i = 0; i < word.length; i++) {
        result += word[i];
        if ((i + 1) % 4 === 0 && i !== word.length - 1) {
            result += ' ';
        }
    }
    return result;
}

//function to peform the first step
function Step1(divisor,remainder){
   
    let num1 = parseInt(remainder, 2);
    let num2 = parseInt(divisor, 2);
    
    // If num1 is smaller than num2, perform subtraction using two's complement
    if (num1 < num2) {
        // Calculate the two's complement of num2
        let twoComplement = Math.pow(2,divisor.length) - num2;
        // Perform subtraction using two's complement
        binaryRemainder =  (num1 + twoComplement).toString(2);
        while (binaryRemainder.length < 8) {
            binaryRemainder = '0' + binaryRemainder;
        }
    } else {
        // Perform normal subtraction
        let difference = num1 - num2;
        // Convert the difference back to binary
        binaryRemainder = difference.toString(2);
        while (binaryRemainder.length < 8) {
            binaryRemainder = '0' + binaryRemainder;
        }
    }
//store in divisionObj
    divisonObj[iterationCount] = {1:[1,binaryDivisor,binaryRemainder,binaryQuotient]};
    // divisonObj[iterationCount] = {1:[binaryDivisor,binaryRemainder,binaryQuotient]};

    Step2(binaryDivisor,binaryRemainder);
 
}

function Step2(divisor,remainder){
    let num1 = parseInt(remainder, 2);
    let num2 = parseInt(divisor, 2);
    //left shift quotient
    let decimal = parseInt(binaryQuotient, 2);
    let shiftedDecimal = decimal << 1;

    //check if remainder is smaller than 0 (128 = 1000 0000)
    if((num1 & 128) !== 0){
        // Perform addition in decimal and then get only 8 bits using bitwise & (255 = 11111111)
        let sum = (num1 + num2) & 255;
        binaryRemainder = sum.toString(2);
        while (binaryRemainder.length < 8) {
            binaryRemainder = '0' + binaryRemainder;
        }
        // Clear the rightmost bit by using bitwise AND with 1110 (binary representation of decimal 14)
        let result = shiftedDecimal & 14; // 14 is binary 1110
        
        
        // Convert the result back to binary
        binaryQuotient = result.toString(2);
        // check if it exceeds length 4
        if(binaryQuotient.length>4){
            binaryQuotient = binaryQuotient.substring(1)
         }
        while (binaryQuotient.length < 4) {
            binaryQuotient = '0' + binaryQuotient;
        }
        divisonObj[iterationCount][2] = ["2b",binaryDivisor,binaryRemainder,binaryQuotient];
       
    }
    else{
         // Set the new rightmost bit to 1 of quotient
         let result = shiftedDecimal | 1;
         // Convert the result back to binary
         binaryQuotient = result.toString(2);
         if(binaryQuotient.length>4){
            binaryQuotient = binaryQuotient.substring(1)
         }
         while (binaryQuotient.length < 4) {
            binaryQuotient = '0' + binaryQuotient;
        }
         divisonObj[iterationCount][2] = ["2a",binaryDivisor,binaryRemainder,binaryQuotient];
    }
    // console.log(divisonObj);
    Step3();

}

function Step3(){
    let decimal = parseInt(binaryDivisor, 2);
    // Shift the decimal number to the right by one bit
    let shiftedDecimal = decimal >> 1;
    // Convert the shifted decimal number back to binary
    binaryDivisor = shiftedDecimal.toString(2);
    // Ensure the result is 8 bits long by padding with zeros if necessary
    while (binaryDivisor.length < 8) {
        binaryDivisor = '0' + binaryDivisor;
    }
    divisonObj[iterationCount][3] = ["3",binaryDivisor,binaryRemainder,binaryQuotient];
   //check number of iterations
    if(iterationCount<5){
        iterationCount++;
        Step1(binaryDivisor,binaryRemainder);
    }
}

function backgroundToTransparent(){
    for (let i = 0; i < colorClass.length; i++) {
        colorClass[i].style.background = 'transparent';
    }
}

// button to get to next step
nextBtn.addEventListener('click',()=>{
    // btnIndex++;
    previousBtn.style.display = "block";
    if(subIndex == 3){
        subIndex = 0;
        btnIndex++;
    }
    subIndex++;
    if((btnIndex==Object.keys(divisonObj).length-1) && (subIndex == 3)){
        nextBtn.style.display = "none";
        backgroundToTransparent();
        colorClass[5].style.background = "#47b04a8f";
        colorClass[4].style.background = "#47b04a8f";
    }
    if(btnIndex<Object.keys(divisonObj).length){
        divisorValue.value = addSpaceAfterFourthLetter(divisonObj[btnIndex][subIndex][1]);
        quotientValue.value = divisonObj[btnIndex][subIndex][3];
        remainderValue.value = addSpaceAfterFourthLetter(divisonObj[btnIndex][subIndex][2]);

        iterationValue.innerText = `${btnIndex}`;
        subIterationValue.innerText = divisonObj[btnIndex][subIndex][0];

        //make all containers tranparent
        if(((btnIndex!=Object.keys(divisonObj).length-1) || (subIndex != 3))){
            backgroundToTransparent();
            if(subIndex ==1){
                colorClass[subIndex].style.background = "#47b04a8f";
            }
            else if(subIndex ==2){
                if(divisonObj[btnIndex][subIndex][0] == "2a"){
                    colorClass[subIndex].style.background = "#47b04a8f";
                }
                else{
                    colorClass[subIndex+1].style.background = "#47b04a8f";
                }
            }
            else if(subIndex == 3){
                colorClass[subIndex+1].style.background = "#47b04a8f";
            }
            
        }
        
        
    }
    else{
        nextBtn.style.display = "none";
        // subIndex = 3;
        // btnIndex = Object.key(divisonObj).length-1;
    }

})


//button to go to previous step
previousBtn.addEventListener('click',()=>{
    // btnIndex++;
    nextBtn.style.display = "block";
    if(subIndex == 1){
        subIndex = 4;
        btnIndex--;
    }
    subIndex--;
    if(btnIndex>0){
        divisorValue.value = addSpaceAfterFourthLetter(divisonObj[btnIndex][subIndex][1]);
        quotientValue.value = divisonObj[btnIndex][subIndex][3];
        remainderValue.value = addSpaceAfterFourthLetter(divisonObj[btnIndex][subIndex][2]);

        iterationValue.innerText = `${btnIndex}`;
        subIterationValue.innerText = divisonObj[btnIndex][subIndex][0];
        backgroundToTransparent();
        if(subIndex ==1){
            colorClass[subIndex].style.background = "#47b04a8f";
        }
        else if(subIndex ==2){
            if(divisonObj[btnIndex][subIndex][0] == "2a"){
                colorClass[subIndex].style.background = "#47b04a8f";
            }
            else{
                colorClass[subIndex+1].style.background = "#47b04a8f";
            }
        }
        else if(subIndex == 3){
            colorClass[subIndex+1].style.background = "#47b04a8f";
        }
        
    }
    //dealing with the first start
    else if(btnIndex == 0){
        divisorValue.value = addSpaceAfterFourthLetter(divisonObj[0][1][0]);
        quotientValue.value = addSpaceAfterFourthLetter(divisonObj[0][1][2]);
        remainderValue.value = addSpaceAfterFourthLetter(divisonObj[0][1][1]);
        iterationValue.innerText = `${btnIndex}`;
        subIndex=0;
        subIterationValue.innerText = `${subIndex}`;
        btnIndex = 1;
        previousBtn.style.display = "none";
        backgroundToTransparent();
        colorClass[0].style.background = "#47b04a8f";

    }
    // else{
    //     console.log("error inside prev btn")
    // }

})

