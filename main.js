const nextButton = document.getElementById("next-btn");
const question = document.getElementById("question");
const category = document.getElementById("category");

let questionIndex = 0;
let score = 0;

async function getQuestions() {
  const api = "https://opentdb.com/api.php?amount=10&type=multiple";
  const result = await fetch(`${api}`);
  const data = await result.json();
}
