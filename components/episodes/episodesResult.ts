//charactersResult.ts

import { Episode } from "./episodeType";

/*Definir el tipo de dato que devuelve
 el endpoint de episodes*/


 export type EpisodesResult = {

    info: {
        pages:number;
        count: number;
        next:string|null;
        prev:string|null;
    },
    results: Episode[];

 }