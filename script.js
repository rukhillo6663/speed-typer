const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const settingsBtn = document.querySelector("#settings-btn");
const difficultySelect = document.querySelector("#difficulty");
const settingsForm = document.querySelector("#settings-form");
const settings = document.querySelector("#settings");
const endGameEl = document.querySelector("#end-game-container");

const randomWordApi = "https://random-word-api.herokuapp.com/word"

let randomWord;
let score = 0;
let time = 30;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;


/*function getRandomWord() {
    fetch(randomWordApi)
    .then((response) => response.json())
    .then(datas => {
        randomWord = datas
          console.log(randomWord)
    })    
}*/
let newArray = [];


//Function to get random word from API
function getRandomWord() {
    fetch(randomWordApi)
    .then((response) => response.json())
    .then(data => {
        randomWord = data[0];
        word.innerHTML = randomWord;
    })    
}


      

//Game over function if user failed
function gameOver() {
  endGameEl.innerHTML = `
        <h1>Time ran out!</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
  endGameEl.style.display = "flex";
}
//Function to update the score if user succeeds
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
//upDate time every second
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

let timeInterval = setInterval(updateTime, 1000);
//EventListener for text input
text.addEventListener("input", (e) => {
  const typedText = e.target.value;
  if (typedText === word.innerHTML) {
    updateScore();
    getRandomWord();

    e.target.value = "";
    if (difficulty === "hard") {
        time += 2;
    } else if (difficulty === "medium") {
        time += 3;
    } else {
        time += 5;
    }
  }
});
//Random word Display
 getRandomWord()
//getRandomWord();

//toggle settings visibility
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

//homework
//get all words from https://random-word-api.herokuapp.com/all and store locally 
//get random word from local database