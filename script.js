const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const settingsBtn = document.querySelector("#settings-btn");
const difficultySelect = document.querySelector("#difficulty");
const settingsForm = document.querySelector("#settings-form");
const settings = document.querySelector("#settings");
const endGameEl = document.querySelector("#end-game-container");



let randomWord;
let score = 0;
let time = 30;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;





const randomWordApi = "https://random-word-api.herokuapp.com/all"
//Function to get random word from API and stores in localStorage
async function getRandomWordList() {
    let fetchData = await fetch(randomWordApi);
    let data = await fetchData.json();
    window.localStorage.clear();
    window.localStorage.setItem('myData',storedData);    
}
//Display a random word from localStorage 
 function randomWordDisplay(){

    let newData =JSON.parse(window.localStorage.getItem('myData'))
    
    //Here I want to display random word from list array
    index = Math.floor(Math.random()*newData.length)
       randomWord = newData[index];
       word.innerHTML = randomWord
       console.log(randomWord);
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
    randomWordDisplay();

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
randomWordDisplay()

//toggle settings visibility
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

//homework
//get all words from https://random-word-api.herokuapp.com/all and store locally 
//get random word from local database