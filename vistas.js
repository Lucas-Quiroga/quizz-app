// CONSTANTES DEL DOM
const siguienteBoton = document.getElementById("next-btn");
const pregunta = document.getElementById("question");
const categoria = document.getElementById("category");
const contenedorPuntuacion = document.getElementById("score-container");

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
      };
    } else {
      console.log("incorrecta");
    }
  });
}

// MOSTRAR PUNTAJE
function mostrarPuntaje(puntuacion) {
  if (!puntuacionh4) {
    puntuacionh4 = document.createElement("h4");
    contenedorPuntuacion.appendChild(puntuacionh4);
  }
  puntuacionh4.innerText = `${puntuacion}`;
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
  if (opcion === pregunta.correct_answer) {
    console.log("respuesta correcta:" + opcion);
    return opcion;
  } else {
    console.log("respuesta incorrecta:", opcion);
  }
}

export { mostrarPregunta, mostrarCategoria, mostrarPuntaje, mostrarOpciones };
