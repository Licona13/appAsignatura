//dataSorce.ts

import { CharactersResult } from "./charactersResult";



//crear clase
export class DataSource{

    constructor() {}
    //metodo para cargar personajes
    async getCharacters(page: number) : Promise<CharactersResult>{
        //consumir la api
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)

    return response.json();
    }
}