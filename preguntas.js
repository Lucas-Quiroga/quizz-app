import {
  mostrarCategoria,
  mostrarOpciones,
  mostrarPregunta,
  obtenerRespuesta,
} from "./vistas";
import { obtenerDatosApi } from "./api";

const siguienteBoton = document.getElementById("next-btn");
const contenedorPuntuacion = document.getElementById("score-container");

let indicePregunta = 0;
let puntuacion = 0;
let datos;
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

// PASAR A LA PROXIMA PREGUNTA
function siguientePregunta() {
  const preguntaActual = datos.results[indicePregunta];

  const respuestaUsuario = obtenerRespuesta(preguntaActual);
  if (respuestaUsuario === preguntaActual.correct_answer) {
    puntuacion++;
    mostrarPuntaje();
  }

  indicePregunta++;

  //   console.log("hola soy la pregunta actual", preguntaActual);
  //   console.log("hola soy el indice de pregunta" + indicePregunta);

  if (indicePregunta >= datos.results.length) {
    console.log("¡Juego completado!");
    // Aquí puedes realizar acciones adicionales una vez que se han mostrado todas las preguntas
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
