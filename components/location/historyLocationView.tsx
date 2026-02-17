import { useEffect, useRef, useState,} from 'react';
import { StyleSheet,View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { Link} from 'expo-router';
import { useRouter } from 'expo-router';

//para la conexion con firebase
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '@/lib/firebase';


export function HistoryLocationsView (){
        //toDo traer el history de la bd y reemplazar estos datos estaticos

        //Este es el estado para almacenar las ubicaciones en firebase
        const [locations, setLocations] = useState<{ latitude: number; longitude: number }[]>([]);


   

    //para almacenar la instancia del mapa
    const mapRef = useRef(null);

    

   // Función para obtener ubicaciones de Firebase
   async function fetchLocations() {
    try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const fetchedLocations = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Asegúrate de que los datos estén completos
            if (data.latitude && data.longitude) {
                return {
                    latitude: data.latitude,
                    longitude: data.longitude,
                };
            }
            return null;
        }).filter(location => location !== null); // Filtra las ubicaciones nulas

        setLocations(fetchedLocations);
    } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
    }
}


     // Obtener ubicaciones cuando el componente se monte
     useEffect(() => {
        fetchLocations();
    }, []);


//efecto que detecte cambio en la ubicacion y mueva la camara(centre el mapa)
useEffect(() =>{
async function showLocation(){
    //si hay ubicacion, centrar la camara
    if(locations.length){
        const camera = await (mapRef?.current as any).getCamera();

        camera.center = {
            latitude: locations[0].latitude,
            longitude: locations[0].longitude
        };

        camera.zoom = 9;

        (mapRef?.current as any).animateCamera(camera, {duration: 1000});
    }
}

    showLocation();
}, [locations]);


return (
    <View style={styles.container}>

    <MapView 
    style ={styles.map} 
    ref={mapRef}
    zoomEnabled

    initialRegion={{
        latitude:18.5955558,
        longitude: -98.4907685,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }}
    >
      {locations.map((location, index) =>(

            <Marker
            key={index}
            coordinate={location}
            pinColor="purple"
            />
))}  

      
    </MapView>

</View>
);
}

const styles = StyleSheet.create({
infoContainer:{
    paddingTop:60,

},
container:{
    flex:1,
},
map:{
    width:'100%',
    height:'100%'
},
botonFlotante:{
    position:"absolute",
    backgroundColor:"orange",
    padding:13,
    bottom:20,
    borderRadius:8,
    marginLeft:13
},


})
