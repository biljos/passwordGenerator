const paragraphPassword = document.querySelector("#password")
const form = document.querySelector("#form")
const buttonCopy = document.querySelector("#button-copy")
const inputLength = document.querySelector("#input-length")
const passwordLenthParagraph = document.querySelector("#password-length") 

const API = "https://goquotes-api.herokuapp.com/api/v1/random?count=5";

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
let words = []


function generatePassword(passwordLenth, checks) {
    let arrayOfArrays = [];

    if(checks.letters){
        arrayOfArrays.push(letters)
    }
    if(checks.numbers){
        arrayOfArrays.push(numbers)
    }
    if(checks.symbols){
        arrayOfArrays.push(symbols)
    }

    if(checks.words){
        arrayOfArrays = []
        arrayOfArrays.push(words)
    }
    
    let strongPassword = [];

    for (let i = 0; i < passwordLenth; i++) {
    
        const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)];
        const randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)];
        
        strongPassword.push(randomCharacter);
        
    }

    if(checks.words){
        strongPassword = strongPassword.join("-")
    } else {
        strongPassword = strongPassword.join("")
    }
    
    paragraphPassword.value = strongPassword
}


function fetchData(API) {
    fetch(API)
        .then(response => response.json())
        .then(data => {
            words = data.quotes.map((quote) => quote.text);
            words = words.join("").split(" ").sort();
        })
}

fetchData(API)

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1))
}


function copyToClipboard(target) {
    const element = document.querySelector(target)
    const value = element.value

    if (value.length === 0){
        alert("Tienes que generar una contrase??a")
    } else {
        window.navigator.clipboard.writeText(value);
        alert("Copiaste la constrase??a");
    }
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
    };

    if(checks.words){
        formElement.letters.checked = false

    }

    generatePassword(passwordLength, checks);
    
    buttonCopy.disabled = false;
});



buttonCopy.addEventListener("click", () => {
    copyToClipboard("#password")
});


inputLength.addEventListener("input", (e) => {
    passwordLenthParagraph.innerText = e.target.value;
});