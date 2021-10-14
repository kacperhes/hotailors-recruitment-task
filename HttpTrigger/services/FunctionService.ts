import { HttpRequestQuery } from "@azure/functions";
import { inject, injectable } from "inversify";
import { IAPIDataType, IFunctionService } from "./IFunctionService";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import { ILogger } from "../../commonServices/iLogger";
import axios from "axios";
import _ from "lodash";

@injectable()
export class FunctionService implements IFunctionService<HttpRequestQuery> {

    @inject(COMMON_TYPES.ILogger)
    private readonly _logger: ILogger;

    private _pokemonesNames: string[];

    public async processMessageAsync(query: HttpRequestQuery): Promise<{[pokemons: string]: string[]}> {
        this._logger.verbose(`${JSON.stringify(query)}`);
        const {id: idsStr, type} = query;
        const pokemonsByType: IAPIDataType[] = await this.getPokemonsFromAPIByType(type);
        const pokemonsFilteredByIds: IAPIDataType[] = this.filterPokemonsByIds(pokemonsByType, idsStr);
        this._pokemonesNames = this.getPokemonsNames(pokemonsFilteredByIds);

        return { pokemons: this._pokemonesNames };
    }

    public async getPokemonsFromAPIByType(type: string): Promise<IAPIDataType[]> {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const pokemons: IAPIDataType[] = _.get(data, "pokemon");
        return pokemons;
    }

    public filterPokemonsByIds(pokemons: IAPIDataType[], ids: string): IAPIDataType[] {
        if (ids === undefined) { return pokemons; } // In case of not providing ids

        const pokemonsIds: string[] = _.split(ids, ",");        
        return _.filter(pokemons, (el: IAPIDataType) => _.includes(pokemonsIds, _.split(el.pokemon.url, "/")[6]));
    }

    public getPokemonsNames(pokemons: IAPIDataType[]): string[] {
        return _.map(pokemons, (el: IAPIDataType) => el.pokemon.name);
    }
}
