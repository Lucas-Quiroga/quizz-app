// CONSUMIENDO LA API
export async function obtenerDatosApi() {
  const api = "https://opentdb.com/api.php?amount=10&type=multiple";
  const resultado = await fetch(`${api}`);
  const datos = await resultado.json();
  return datos;
}
