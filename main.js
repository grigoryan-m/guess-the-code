"use strict";


    let password = generateNewPassword();
    document.addEventListener("DOMContentLoaded", ()=>{
    const allInputs = document.getElementsByClassName("attempt");
    for(let i = 4; i < allInputs.length; i++){
        allInputs[i].disabled = true;
    }
    for(let i = 0; i < allInputs.length; i++){
        allInputs[i].value = '';
    }
});
const inputs = document.querySelectorAll('.attempt');
let attempt = 1;

inputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
        if (index < inputs.length - 1 && event.target.value.length > 0) {
            inputs[index + 1].focus();
        }
    });
});
inputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && input.value === '') {
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
    });
  });
document.addEventListener("keydown", (event) => {
    if(event.code === "Enter"){
        const disableInputs = document.getElementsByClassName(`field-${attempt}`);
        if(isAnyInputEmpty(disableInputs) == false){
            for(let i = 0; i < disableInputs.length; i++){
                disableInputs[i].disabled = true;
                if(disableInputs[i].value == password[i]){
                    disableInputs[i].style.backgroundColor = "green";
                    disableInputs[i].style.color = "white";
                }else if(!password.includes(parseInt(disableInputs[i].value))){
                    disableInputs[i].style.backgroundColor = "red";
                    disableInputs[i].style.color = "white";
                }else if(password.includes(parseInt(disableInputs[i].value))){
                    disableInputs[i].style.backgroundColor = "#F4C430";
                    disableInputs[i].style.color = "white";
                }
            }

            if(isGameEnded(disableInputs, password, attempt) == 1){
                alert("You won!");
                location.reload();
            }else if(isGameEnded(disableInputs, password, attempt) == -1){
                alert(`You lost!\nPassword was ${password}`);
            }
            attempt++;
            const enableInputs = document.getElementsByClassName(`field-${attempt}`);
            for(let i = 0; i < enableInputs.length; i++){
                enableInputs[i].disabled = false;
            }
            enableInputs[0].focus();


        }
    }
});


function isAnyInputEmpty(array){
    for(let i = 0; i < array.length; i++){
        if(array[i].value.trim() === ''){
            return true;
        }
    }
    return false;
}

function getRandomNum(max){
    return Math.round(Math.random() * max);
}
function isGameEnded(inputs, password, attempt){
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value != password[i]){
            if(attempt == 5){
                return -1;
            }else{
                return 0;
            }
        }
    }
    return 1;
}

function generateNewPassword(){
    return removeDuplicateNumbers([getRandomNum(9), getRandomNum(9), getRandomNum(9), getRandomNum(9)]);
}

function removeDuplicateNumbers(arr) {
    if (arr.length !== 4) {
      throw new Error('Массив должен содержать ровно 4 числа.');
    }
  
    const uniqueNumbers = [...new Set(arr)];
  
    if (uniqueNumbers.length === 4) {
      // Если в массиве нет повторяющихся чисел, просто вернем его
      return uniqueNumbers;
    } else {
      // Если в массиве есть повторяющиеся числа, создадим новый массив
      // с уникальными числами, начиная с 1 и увеличивая на 1 для каждого числа
      const resultArray = [];
      let uniqueNumber = 1;
  
      for (let i = 0; i < 4; i++) {
        while (uniqueNumbers.includes(uniqueNumber)) {
          uniqueNumber++;
        }
        resultArray.push(uniqueNumber);
        uniqueNumber++;
      }
  
      return resultArray;
    }
  }
