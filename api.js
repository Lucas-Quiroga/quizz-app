export async function getDataApi() {
  const api = "https://opentdb.com/api.php?amount=10&type=multiple";
  const results = await fetch(`${api}`);
  const datos = await results.json();
  return datos;
}
