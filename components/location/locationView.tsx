import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { Link, router } from 'expo-router';
import { useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';


export function LocationView (){

    const [permission, requestPermission] = Location.useForegroundPermissions();

    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    //para almacenar la instancia del mapa
    const mapRef = useRef(null);

    
    
useEffect(() => {
  async function getCurrentLocation() {

    if (!permission?.granted) {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

  }

  getCurrentLocation();
}, [permission]);

//efecto que detecte cambio en la ubicacion y mueva la camara(centre el mapa)
useEffect(() =>{
async function showLocation(){
    //si hay ubicacion, centrar la camara
    if(location){
        const camera = await (mapRef?.current as any).getCamera();

        camera.center = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };

        (mapRef?.current as any).animateCamera(camera, {duration: 1000});
    }
}

    showLocation();
}, [location]);

async function saveLocationToFirebase(location : Location.LocationObject) {
    try {
      await addDoc(collection(db, "locations"), {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(),
      });
      console.log("Ubicación guardada en Firebase");
    } catch (error) {
      console.error("Error al guardar la ubicacion:", error);
    }
  }
  
  // Llamar a esta funcion en useEffect después de obtener la ubicación:
  useEffect(() => {
    if (location) {
      saveLocationToFirebase(location);
    }
  }, [location]);



if(!permission?.granted){
    return(
<View style ={styles.infoContainer}>

    <Text>Debes permitir el acceso a la ubicacion.</Text>
    <Button
    onPress={requestPermission}
    title='Permitir ubicacion'
    />

</View>

    );
}

return (
    <View style={styles.container}>
        
        <View style ={styles.floatingInfo}>
            <Text style ={styles.infoTitle}>Ubicación</Text>

            <View style={styles.coordinatesContainer}>
                    {location ? (
                        <>
                            <Text style={styles.coordinate}>Latitud: {location.coords.latitude}</Text>
                            <Text style={styles.coordinate}>Longitud: {location.coords.longitude}</Text>
                        </>
                    ) : (
                        <Text>Ubicación no disponible</Text>
                    )}
                </View>
        </View>

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
      {location ? (
        <Marker
        coordinate={location.coords}
        pinColor="red"
        />
      ): null}  
    </MapView>

   

<TouchableOpacity 
  style={styles.botonFlotante}
  onPress={() => router.push('/historyLocations/historyLocationsView')}

>

        <Text>Historial</Text>
    </TouchableOpacity>
    
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
floatingInfo: {
    position: "absolute",
    top: 30, // Espaciado desde la parte superior
    left: "10%",
    right: "10%",
    backgroundColor: "bisque",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
    alignItems: "center",
    zIndex: 10,
},
infoTitle:{
    position:"absolute",
    //backgroundColor:"green",
    fontWeight:"bold",

},
coordinatesContainer: {
    alignItems: 'center',
},
coordinate: {
    fontSize: 16,
    color: "green",
    marginVertical: 4,
},


})