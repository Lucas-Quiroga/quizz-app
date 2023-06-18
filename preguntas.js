// import {
//   mostrarCategoria,
//   mostrarOpciones,
//   mostrarPregunta,
//   siguientePregunta,
//   mostrarPuntaje,
// } from "./vistas";
import { obtenerDatosApi } from "./api";

const containerPrincipal = document.getElementById("dad-conteinter");
const siguienteBoton = document.getElementById("next-btn");
const contenedorPuntuacion = document.getElementById("score-container");
const pregunta = document.getElementById("question");
const categoria = document.getElementById("category");
let indicePregunta = 0;
let datos;
let opcionSeleccionada = false;
let puntuacion = 0;
let puntuacionElemento;

// INICIAR EL JUEGO
export async function iniciarJuego() {
  datos = await obtenerDatosApi();

  puntuacionElemento = document.createElement("h4");
  contenedorPuntuacion.appendChild(puntuacionElemento);
  mostrarPregunta(datos.results[indicePregunta]);
  mostrarCategoria(datos.results[indicePregunta]);
  mostrarOpciones(datos.results[indicePregunta]);
  mostrarPuntaje();
  siguienteBoton.addEventListener("click", siguientePregunta);
}

// MOSTRAR PREGUNTA
function mostrarPregunta(preguntaActual) {
  pregunta.innerHTML = preguntaActual.question;
}

// MOSTRAR CATEGORIA
function mostrarCategoria(preguntaActual) {
  categoria.innerText = preguntaActual.category;
}

// MOSTRAMOS LAS OPCIONES
function mostrarOpciones(preguntaActual) {
  const contenedorOpciones = document.getElementById("choices-container");
  contenedorOpciones.innerHTML = "";

  const todasOpciones = ordenarOpciones([
    ...preguntaActual.incorrect_answers,
    preguntaActual.correct_answer,
  ]);

  todasOpciones.forEach((opcion) => {
    const boton = crearBotonOpcion(opcion);
    contenedorOpciones.appendChild(boton);
    if (opcion === preguntaActual.correct_answer) {
      boton.onclick = () => {
        obtenerRespuesta(preguntaActual, opcion);
        boton.classList.add("btn", "btn-success");
        desactivarOpciones(contenedorOpciones);
        opcionSeleccionada = true;
      };
      opcionSeleccionada = false;
    } else {
      boton.onclick = () => {
        obtenerRespuesta(preguntaActual, opcion);
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

  const respuestaUsuario = obtenerRespuesta(preguntaActual);
  if (respuestaUsuario === preguntaActual.correct_answer) {
    puntuacion = puntuacion + 1;
    mostrarPuntaje();
  }

  indicePregunta++;

  if (indicePregunta >= datos.results.length) {
    containerPrincipal.innerHTML = `
    <div class="card text-center">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <a href="/" class="btn btn-primary">Volver a jugar</a>
  <div class="card-footer text-body-secondary">
    2 days ago
  </div>
</div>
    `;
  } else {
    // Mostrar la siguiente pregunta
    mostrarPregunta(datos.results[indicePregunta]);
    mostrarCategoria(datos.results[indicePregunta]);
    mostrarOpciones(datos.results[indicePregunta]);
  }
}

// MOSTRAR PUNTAJE
function mostrarPuntaje() {
  puntuacionElemento.innerText = puntuacion;
}

/**
 * Otra logica
 */

// ORDENAR LAS OPCIONES ALEATORIAMENTE
function ordenarOpciones(array) {
  const arrayLimpio = [...array];
  return arrayLimpio.sort(() => Math.random() - 0.5);
}

// CREAR LOS BOTONES
function crearBotonOpcion(opcion) {
  const boton = document.createElement("button");
  boton.innerText = opcion;
  boton.classList.add("btn", "btn-primary", "mr-2");
  return boton;
}

// AGARRAR LA RESPUESTA CORRECTA
function obtenerRespuesta(pregunta, opcion) {
  if (opcion === pregunta.correct_answer) return opcion;
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
