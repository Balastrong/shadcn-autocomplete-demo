import { Skeleton } from "./ui/skeleton";

type Props = {
  isLoading: boolean;
  pokemon: {
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
    };
  };
};

export const PokemonCard = ({ pokemon, isLoading }: Props) => {
  if (!pokemon && !isLoading) return null;

  return (
    <div className="flex items-center gap-2">
      {isLoading ? (
        <Skeleton className="size-20" />
      ) : (
        <img
          className="size-20 size-min-20"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      )}
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </>
        ) : (
          <>
            <h3 className="capitalize font-semibold">{pokemon?.name}</h3>
            <p>Height: {pokemon.height / 10}m</p>
            <p>Weight: {pokemon.weight / 10}kg</p>
          </>
        )}
      </div>
    </div>
  );
};
