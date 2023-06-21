import { getDataApi } from "./api";

const mainContainer = document.getElementById("dad-conteinter");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const questionElement = document.getElementById("question");
const categoryElement = document.getElementById("category");
const timerElement = document.getElementById("timer");
const timerText = document.getElementById("timer-text");
const questionNumberElement = document.getElementById("questionNumber");

let timeLeft = 100;
let currentQuestionIndex = 0;
let data;
let optionSelected = false;
let score = 0;
let scoreElement;
let selectedAnswer;
let gameFinished = false;
let totalQuestions;

let nextQuestionState = true;

export async function startGame() {
  data = await getDataApi();
  startTimer();
  totalQuestions = data.results.length;
  mainContainer.classList.remove("visually-hidden");
  scoreElement = document.createElement("h4");
  scoreContainer.appendChild(scoreElement);
  showQuestion(data.results[currentQuestionIndex]);
  showCategory(data.results[currentQuestionIndex]);
  showOptions(data.results[currentQuestionIndex]);
  showQuestionNumber(0);
  showScore();
  nextQuestionState
    ? nextButton.addEventListener("click", nextQuestion)
    : false;
}

function startTimer() {
  const intervalId = setInterval(() => {
    timeLeft--;
    timerElement.style.width = `${timeLeft}%`;
    timerText.innerHTML = `${timeLeft}`;

    if (timeLeft <= 0 && !gameFinished) {
      clearInterval(intervalId);
      showTimeOutMessage();
    }
  }, 1000);
}

function showTimeOutMessage() {
  mainContainer.innerHTML = `
    <div class="card text-center">
      <div class="card-header">
        Game Over
      </div>
      <div class="card-body">
        <h5 class="card-title">Score: ${score} out of ${totalQuestions}</h5>
        <p class="card-text">Time's up!</p>
        <a href="/" class="btn btn-primary">Play Again</a>
      </div>
    </div>
  `;
}

function showQuestion(currentQuestion) {
  questionElement.innerHTML = currentQuestion.question;
}

function showQuestionNumber(currentQuestion) {
  questionNumberElement.innerText = `Question ${currentQuestion + 1} / 10`;
}

function showCategory(currentQuestion) {
  categoryElement.innerHTML = `<b>${currentQuestion.category}</b>`;
}

function showOptions(currentQuestion) {
  const optionsContainer = document.getElementById("choices-container");
  optionsContainer.innerHTML = "";

  const allOptions = shuffleOptions([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);
  nextButton.classList.add("ocultar");
  allOptions.forEach((option) => {
    const button = createOptionButton(option);
    optionsContainer.appendChild(button);
    if (option === currentQuestion.correct_answer) {
      button.onclick = () => {
        getAnswer(option);
        button.classList.add("btn", "btn-success");
        disableOptions(optionsContainer);
        optionSelected = true;
      };
      optionSelected = false;
    } else {
      button.onclick = () => {
        getAnswer(option);
        button.classList.add("btn", "btn-danger");
        disableOptions(optionsContainer);
        showCorrectAnswer(optionsContainer, currentQuestion.correct_answer);
        optionSelected = true;
      };
      optionSelected = false;
    }
  });
}

function nextQuestion() {
  if (!optionSelected) {
    return;
  }
  const currentQuestion = data.results[currentQuestionIndex];
  const userAnswer = selectedAnswer;

  if (userAnswer === currentQuestion.correct_answer) {
    increaseScore();
    showScore();
  }

  currentQuestionIndex++;

  nextButton.classList.add("btn-secondary");
  if (currentQuestionIndex >= data.results.length) {
    gameFinished = true;
    mainContainer.innerHTML = `
    <div class="card text-center">
      <div class="card-header">
        Game Over
      </div>
      <div class="card-body">
        <h5 class="card-title">Score: ${score} out of ${totalQuestions}</h5>
        <p class="card-text">You have completed all the questions!</p>
        <a href="/" class="btn btn-primary">Play Again</a>
      </div>
    </div>
    `;
  } else {
    showQuestion(data.results[currentQuestionIndex]);
    showCategory(data.results[currentQuestionIndex]);
    showOptions(data.results[currentQuestionIndex]);
    showQuestionNumber(currentQuestionIndex);
  }
}

function showScore() {
  scoreElement.innerText = `${score}`;
}

function increaseScore() {
  return (score += 1);
}

function shuffleOptions(array) {
  const shuffledArray = [...array];
  return shuffledArray.sort(() => Math.random() - 0.5);
}

function createOptionButton(option) {
  const button = document.createElement("button");
  button.innerText = option;
  button.classList.add("btn", "btn-primary", "mr-2", "boton-choices");
  button.style = `box-shadow: 0px 9px 7px 0px rgba(138,135,230,1);
    box-shadow: 0px 9px 7px 0px rgba(138,135,230,1);
    box-shadow: 0px 9px 7px 0px rgba(138,135,230,1);
  `;
  nextButton.classList.add("ocultar");
  return button;
}

function getAnswer(option) {
  selectedAnswer = option;

  if (selectedAnswer) {
    nextQuestionState = true;
    nextButton.classList.remove("ocultar");
    nextButton.classList.add("btn-secondary");
  } else {
    nextQuestionState = false;
    nextButton.classList.add("ocultar");
    nextButton.classList.add("btn-secondary");
  }
}

function disableOptions(optionsContainer) {
  const optionButtons = optionsContainer.querySelectorAll("button");
  optionButtons.forEach((button) => {
    button.disabled = true;
    button.classList.add("btn-custom");
  });
}

function showCorrectAnswer(optionsContainer, correctAnswer) {
  const optionButtons = optionsContainer.querySelectorAll("button");
  optionButtons.forEach((button) => {
    if (button.innerText === correctAnswer) {
      button.classList.add("btn", "btn-success");
    }
  });
}
