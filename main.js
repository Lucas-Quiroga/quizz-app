const nextButton = document.getElementById("next-btn");
const question = document.getElementById("question");
const category = document.getElementById("category");

let questionIndex = 0;
let score = 0;

async function getDataApi() {
  const api = "https://opentdb.com/api.php?amount=10&type=multiple";
  const result = await fetch(`${api}`);
  const data = await result.json();
  console.log(data);
  getInitApp(data);
}

function getInitApp(data) {
  const currentQuestion = data.results[questionIndex];
  question.innerHTML = currentQuestion.question;
  category.innerText = currentQuestion.category;

  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  const allChoices = sortChoiches([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  allChoices.forEach((choice) => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.classList.add("btn", "btn-primary", "mr-2");
    choicesContainer.appendChild(button);

    if (choice === currentQuestion.correct_answer) {
      button.onclick = () => {
        console.log("correcta");
      };
    } else return console.log("incorrecta");
  });

  nextQuestion();
}

function sortChoiches(array) {
  const arrayClean = [...array];
  return arrayClean.sort(() => Math.random() - 0.5);
}

function nextQuestion(respuestaUser) {
  if (respuestaUser === currentQuestion.correct_answer) score++;

  questionIndex++;

  if (questionIndex >= data.results.length) {
    console.log("¡Juego completado!");
    // Aquí puedes realizar acciones adicionales una vez que se han mostrado todas las preguntas
  } else {
    // Mostrar la siguiente pregunta
    currentQuestion;
    getQuestions(data);
  }
}

console.log("prueba");
getDataApi();
