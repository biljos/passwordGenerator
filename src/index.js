const paragraphPassword = document.querySelector("#password")
const form = document.querySelector("#form")

const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
  
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];


function generatePassword(passwordLenth, checks) {
    const arrayOfArrays = [];

    if(checks.letters){
        arrayOfArrays.push(letters)
    }
    if(checks.numbers){
        arrayOfArrays.push(numbers)
    }
    if(checks.symbols){
        arrayOfArrays.push(symbols)
    }
    
    let strongPassword = [];

    for (let i = 0; i < passwordLenth; i++) {
    
        const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)];
        const randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)];
        
        strongPassword.push(randomCharacter);
        
    }

    strongPassword = strongPassword.join("")
    paragraphPassword.innerText = `Aqui aparecera tu contraseña ${strongPassword}`

    console.log(strongPassword)
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1))
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formElement = event.target
    const passwordLength = event.target.length.value;
    const checks = {
        letters : formElement.letters.checked,
        numbers : formElement.numbers.checked,
        words : formElement.words.checked,
        symbols : formElement.symbols.checked,
    }

    generatePassword(passwordLength, checks);
});

