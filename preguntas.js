import { obtenerDatosApi } from "./api";

const containerPrincipal = document.getElementById("dad-conteinter");
const siguienteBoton = document.getElementById("next-btn");
const contenedorPuntuacion = document.getElementById("score-container");
const pregunta = document.getElementById("question");
const categoria = document.getElementById("category");
const timerElement = document.getElementById("timer");
const timerText = document.getElementById("timer-text");
const questionNumber = document.getElementById("questionNumber");

let timeLeft = 100;
let indicePregunta = 0;
let datos;
let opcionSeleccionada = false;
let puntuacion = 0;
let puntuacionElemento;
let respuestaSeleccionada;
let juegoTerminado = false;
let totalPreguntas;

let siguientePreguntaState = true;

// INICIAR EL JUEGO
export async function iniciarJuego() {
  datos = await obtenerDatosApi();
  startTimer();
  totalPreguntas = datos.results.length;
  containerPrincipal.classList.remove("visually-hidden");
  puntuacionElemento = document.createElement("h4");
  contenedorPuntuacion.appendChild(puntuacionElemento);
  mostrarPregunta(datos.results[indicePregunta]);
  mostrarCategoria(datos.results[indicePregunta]);
  mostrarOpciones(datos.results[indicePregunta]);
  questionNumberFunc(0);
  mostrarPuntaje();
  siguientePreguntaState
    ? siguienteBoton.addEventListener("click", siguientePregunta)
    : false;
}

function startTimer() {
  const intervalId = setInterval(() => {
    timeLeft--;
    timerElement.style.width = `${timeLeft}%`;
    timerText.innerHTML = `${timeLeft}`;

    if (timeLeft <= 0 && !juegoTerminado) {
      clearInterval(intervalId);
      mostrarMensajeTiempoAgotado();
    }
  }, 1000); // Actualiza cada segundo
}

function mostrarMensajeTiempoAgotado() {
  containerPrincipal.innerHTML = `
    <div class="card text-center">
      <div class="card-header">
        Juego finalizado
      </div>
      <div class="card-body">
        <h5 class="card-title">Puntuación: ${puntuacion} de ${totalPreguntas}</h5>
        <p class="card-text">¡Se acabó el tiempo!</p>
        <a href="/" class="btn btn-primary">Volver a jugar</a>
      </div>
    </div>
  `;
}

// MOSTRAR PREGUNTA
function mostrarPregunta(preguntaActual) {
  pregunta.innerHTML = preguntaActual.question;
}

function questionNumberFunc(preguntaActual) {
  questionNumber.innerText = `Question Nº ${preguntaActual + 1} / 10`;
}

// MOSTRAR CATEGORIA
function mostrarCategoria(preguntaActual) {
  categoria.innerHTML = `<b>${preguntaActual.category}</b>`;
}

// MOSTRAMOS LAS OPCIONES
function mostrarOpciones(preguntaActual) {
  const contenedorOpciones = document.getElementById("choices-container");
  contenedorOpciones.innerHTML = "";

  const todasOpciones = ordenarOpciones([
    ...preguntaActual.incorrect_answers,
    preguntaActual.correct_answer,
  ]);
  siguienteBoton.classList.add("ocultar");
  todasOpciones.forEach((opcion) => {
    const boton = crearBotonOpcion(opcion);
    contenedorOpciones.appendChild(boton);
    if (opcion === preguntaActual.correct_answer) {
      boton.onclick = () => {
        obtenerRespuesta(opcion);
        boton.classList.add("btn", "btn-success");
        desactivarOpciones(contenedorOpciones);
        opcionSeleccionada = true;
      };
      opcionSeleccionada = false;
    } else {
      boton.onclick = () => {
        obtenerRespuesta(opcion);
        boton.classList.add("btn", "btn-danger");
        desactivarOpciones(contenedorOpciones);
        mostrarRespuestaCorrecta(
          contenedorOpciones,
          preguntaActual.correct_answer
        );
        opcionSeleccionada = true;
      };
      opcionSeleccionada = false;
    }
  });
}

// PASAR A LA PROXIMA PREGUNTA
function siguientePregunta() {
  if (!opcionSeleccionada) {
    return;
  }
  const preguntaActual = datos.results[indicePregunta];
  const respuestaUsuario = respuestaSeleccionada; // Obtener la respuesta seleccionada por el usuario

  if (respuestaUsuario === preguntaActual.correct_answer) {
    sumarPuntaje();
    mostrarPuntaje();
  }

  indicePregunta++;

  // siguienteBoton.classList.remove("btn-info");
  siguienteBoton.classList.add("btn-secondary");
  if (indicePregunta >= datos.results.length) {
    juegoTerminado = true;
    containerPrincipal.innerHTML = `
    <div class="card text-center">
    <div class="card-header">
    Game over
    </div>
    <div class="card-body">
      <h5 class="card-title">Score: ${puntuacion} out of ${totalPreguntas}</h5>
      <p class="card-text">You have completed all the questions!</p>
      <a href="/" class="btn btn-primary">Play again
      </a>
    </div>
  </div>
    `;
  } else {
    // Mostrar la siguiente pregunta
    mostrarPregunta(datos.results[indicePregunta]);
    mostrarCategoria(datos.results[indicePregunta]);
    mostrarOpciones(datos.results[indicePregunta]);
    questionNumberFunc(indicePregunta);
  }
}

// MOSTRAR PUNTAJE
function mostrarPuntaje() {
  puntuacionElemento.innerText = `${puntuacion}`;
}

function sumarPuntaje() {
  return (puntuacion += 1);
}

// ORDENAR LAS OPCIONES ALEATORIAMENTE
function ordenarOpciones(array) {
  const arrayLimpio = [...array];
  return arrayLimpio.sort(() => Math.random() - 0.5);
}

// CREAR LOS BOTONES
function crearBotonOpcion(opcion) {
  const boton = document.createElement("button");
  boton.innerText = opcion;
  boton.classList.add("btn", "btn-primary", "mr-2", "boton-choices");
  boton.style = `box-shadow: 0px 9px 7px 0px rgba(138,135,230,1);
  box-shadow: 0px 9px 7px 0px rgba(138,135,230,1);
  box-shadow: 0px 9px 7px 0px rgba(138,135,230,1);
  ;
  `;
  siguienteBoton.classList.add("ocultar");
  return boton;
}

// AGARRAR LA RESPUESTA
function obtenerRespuesta(opcion) {
  respuestaSeleccionada = opcion;

  if (respuestaSeleccionada) {
    siguientePreguntaState = true;
    siguienteBoton.classList.remove("ocultar");
    siguienteBoton.classList.add("btn-secondary");
  } else {
    siguientePreguntaState = false;
    siguienteBoton.classList.add("ocultar");
    siguienteBoton.classList.add("btn-secondary");
  }
}

// DESACTIVAR OPCIONES
function desactivarOpciones(contenedorOpciones) {
  const botonesOpcion = contenedorOpciones.querySelectorAll("button");
  botonesOpcion.forEach((boton) => {
    boton.disabled = true;
    boton.classList.add("btn-custom");
  });
}

// MOSTRAR RESPUESTA CORRECTA
function mostrarRespuestaCorrecta(contenedorOpciones, respuestaCorrecta) {
  const botonesOpcion = contenedorOpciones.querySelectorAll("button");
  botonesOpcion.forEach((boton) => {
    if (boton.innerText === respuestaCorrecta) {
      boton.classList.add("btn", "btn-success");
    }
  });
}
