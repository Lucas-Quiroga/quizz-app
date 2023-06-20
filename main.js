import { iniciarJuego } from "./preguntas";

// function mostrarSpinner() {
//   const spinnerElement = document.getElementById("spinner");
//   spinnerElement.innerHTML = `
//     <div class="spinner-border" role="status">
//       <span class="visually-hidden">Loading...</span>
//     </div>
//   `;
// }

// function ocultarSpinner() {
//   const spinnerElement = document.getElementById("spinner");
//   spinnerElement.innerHTML = "";
// }

function iniciarAplicacion() {
  // mostrarSpinner();
  // setTimeout(() => {
  //   ocultarSpinner();

  // }, 2000);

  iniciarJuego();
}

iniciarAplicacion();
