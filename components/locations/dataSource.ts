//dataSorce.ts

import { LocationsResult } from "./locationsResult";



//crear clase
export class DataSource{

    constructor() {}
    //metodo para cargar personajes
    async getLocations(page: number) : Promise<LocationsResult>{
        //consumir la api
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`)

    return response.json();
    }
}