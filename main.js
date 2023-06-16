import { obtenerDatosApi } from "./api";
import { iniciarJuego } from "./preguntas";

async function iniciarAplicacion() {
  const datos = await obtenerDatosApi();
  iniciarJuego(datos);
}

iniciarAplicacion();
