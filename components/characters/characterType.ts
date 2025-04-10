
//tipo character 
// donde especificamos 
// las propiedades de un 
// personaje
export type Character = {

    id: number;
    name:String;
    status: "Alive"| "Dead" | "Unknown";
    origin: {
        name:string;
    }
    species: string;
    location: {
    name:string
    };

    image: string;
}