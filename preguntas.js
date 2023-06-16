import {
  mostrarCategoria,
  mostrarOpciones,
  mostrarPregunta,
  mostrarPuntaje,
} from "./vistas";

let indicePregunta = 0;

// INICIAR EL JUEGO
export function iniciarJuego(datos) {
  const preguntaActual = datos.results[indicePregunta];
  mostrarPregunta(preguntaActual);
  mostrarCategoria(preguntaActual);
  mostrarOpciones(preguntaActual);
}

// PASAR A LA PROXIMA PREGUNTA
function siguientePregunta(preguntaActual, respuestaUsuario) {
  if (respuestaUsuario === preguntaActual.correct_answer) puntuacion++;
  if (respuestaUsuario === preguntaActual.incorrect_answer) puntuacion;
  mostrarPuntaje(puntuacion);

  indicePregunta++;

  if (indicePregunta >= datos.results.length) {
    console.log("¡Juego completado!");
    // Aquí puedes realizar acciones adicionales una vez que se han mostrado todas las preguntas
  } else {
    // Mostrar la siguiente pregunta
    const siguientePreguntaDatos = datos.results[indicePregunta];
    mostrarPregunta(siguientePreguntaDatos);
    mostrarCategoria(siguientePreguntaDatos);
    mostrarOpciones(siguientePreguntaDatos);
  }
}
