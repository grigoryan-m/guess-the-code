"use strict";


const password = [getRandomNum(9), getRandomNum(9), getRandomNum(9), getRandomNum(9)];
document.addEventListener("DOMContentLoaded", ()=>{
    console.log(password);

    const allInputs = document.getElementsByClassName("attempt");
    for(let i = 4; i < allInputs.length; i++){
        allInputs[i].disabled = true;
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
                alert("you won!");
            }else if(isGameEnded(disableInputs, password, attempt) == -1){
                alert("you lose");
            }
            attempt++;
            const enableInputs = document.getElementsByClassName(`field-${attempt}`);
            for(let i = 0; i < enableInputs.length; i++){
                enableInputs[i].disabled = false;
            }


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