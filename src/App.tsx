import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";
import { AutoComplete } from "./components/autocomplete";
import { PokemonCard } from "./components/pokemon-card";
import { getDetail, getList } from "./lib/api";

function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["data", searchValue],
    queryFn: () => getList(searchValue),
  });

  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ["pokemon", selectedValue],
    queryFn: () => getDetail(selectedValue),
    enabled: !!selectedValue,
  });

  return (
    <main className="flex items-center flex-col m-8 p-4 gap-4">
      <h2 className="text-2xl font-semibold">Autocomplete component</h2>
      <div className="grid grid-cols-2">
        <div>Selected value:</div>
        <div className="text-center">{selectedValue}</div>
        <div>Search value:</div>
        <div className="text-center">{searchValue}</div>
        <div>Loading state:</div>
        <div className="text-center">{isLoading ? "true" : "false"}</div>
      </div>
      <AutoComplete
        selectedValue={selectedValue}
        onSelectedValueChange={setSelectedValue}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        items={data ?? []}
        isLoading={isLoading}
        emptyMessage="No pokemon found."
      />
      <PokemonCard pokemon={pokemon} isLoading={isLoadingPokemon} />
    </main>
  );
}

export default App;
