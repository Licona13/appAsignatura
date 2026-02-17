import { useEffect, useState } from "react";
import PermissionsLayout from "./permissionLayout";
import { getPermissionsAsync, PermissionResponse, requestPermissionsAsync } from "expo-contacts";


export default function ContactsPermission() {

//estado para el permiso de contactos
const [permission, setPermission] = useState<PermissionResponse | undefined>(undefined);
  
//funcion para solicitar acceso a contactos
const requestPermission = () => {
    requestPermissionsAsync()
        .then((result) => {
        setPermission(result);
        });

}
    //verificar el status del servicio
    useEffect(() => {
        getPermissionsAsync()
        .then((result) =>{
            console.log(result);
            setPermission(result);
        })
    }, []);

    return(
        <PermissionsLayout
            icon="people-sharp"
            title="Contactos"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}   


           
