// const answerChoices = ["sigurd","seliph","arvis","lewyn","julia"];
const answerChoices = [
    // Characters
    "arvis",
    "olwen",
    "nanna",
    "osian",
    "julia",
    "lewyn",
    "arvis",
    "brave",
    "light",
    "sleep",
    "torch",
    "baldr",
    "hezul",
    "thrud",
  ];
const answer = answerChoices[Math.floor(Math.random() * answerChoices.length)];
let currentRow=0;

const grid = document.getElementById("grid");
for (let x=0;x<30;x++){
    const cell=document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);
}

const input = document.getElementById("input");
const submit = document.getElementById("submit");
const message = document.getElementById("message");
const tryAgainButton = document.getElementById("try-again");

submit.addEventListener("click", () => {
    const guess = input.value.toLowerCase().trim();
    if (guess.length !== 5){
        message.textContent = "Please enter a 5-letter word.";
        return;
    }
    if (currentRow>=6){
        message.textContent = "Game over! The answer was: " + answer.toUpperCase();
        return;
    }
    const rowCells = Array.from(grid.children).slice(currentRow*5, currentRow *5 + 5);
    let correctCount=0;

    for (let x=0; x<5;x++){
        rowCells[x].textContent=guess[x];
        if(guess[x]===answer[x]){
            rowCells[x].classList.add("correct");
            correctCount++;
        } else if (answer.includes(guess[x])) {
            rowCells[x].classList.add("present");
        } else {
            rowCells[x].classList.add("absent");
        }
    }

    if (correctCount===5 && currentRow === 0){
        message.textContent="Congratulations, you are a winner with only one move! Jugdral is safe within your hands.";
        endGame();
        return;
    } else if (correctCount===5 && currentRow > 0){
        message.textContent="Congratulations, you are a winner, but try with less moves!";
        endGame();
        return;
    }

    currentRow++;
    input.value="";
    if (currentRow == 6){
        message.textContent="Game Over. Correct answer = " +answer.toUpperCase();
        endGame();
    }
});

tryAgainButton.addEventListener("click", () => {
    location.reload();
});

function endGame(){
    input.disabled=true;
    submit.disabled=true;
    tryAgainButton.style.display="block";
}

function sendFeedback() {
    const feedbackText = document.getElementById("feedback-text").value.trim();
  
    if (!feedbackText) {
      alert("Please enter your feedback before sending.");
      return;
    }
  
    const email = "firdauskotp@gmail.com";
    const subject = "Feedback from User";
    const body = encodeURIComponent(feedbackText);
  
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;
  }
  