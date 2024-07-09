import data from "./data.json";

export async function getList(filter: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const lowerFilter = filter.toLocaleLowerCase();
  return data
    .filter(({ name }) => name.toLocaleLowerCase().startsWith(lowerFilter))
    .slice(0, 20)
    .map(({ name, id }) => ({
      value: id,
      label: `${name}`,
    }));
}

export async function getDetail(id: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 400));
  return await response.json();
}
