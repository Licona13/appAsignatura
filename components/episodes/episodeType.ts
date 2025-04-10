
//tipo character 
// donde especificamos 
// las propiedades de un 
// episodio


    export type Episode = {

        id: number;
        name:string;
        episode: string;//ej:S01E02
        air_date: string;
        image: string;
        characters: number[];
    }
