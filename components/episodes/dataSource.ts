//dataSorce.ts

import { EpisodesResult } from "./episodesResult";



//crear clase
export class DataSource{

    constructor() {}
    //metodo para cargar personajes
    async getEpisodes(page: number) : Promise<EpisodesResult>{
        //consumir la api
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)

    return response.json();
    }
}