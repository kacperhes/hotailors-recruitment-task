interface IPokemon {
    name: string;
    url: string | URL;
}

export interface IAPIDataType {
    pokemon: IPokemon;
    slot: number;
}

export interface IFunctionService<T> {
    processMessageAsync(message: T): Promise<string[]>;
    getPokemonsFromAPIByType(type: string): Promise<IAPIDataType[]>;
    filterPokemonsByIds(pokemons: IAPIDataType[], ids: string): IAPIDataType[];
    getPokemonsNames(pokemons: IAPIDataType[]): string[];
}
