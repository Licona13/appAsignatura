import { StyleSheet, Text, View } from "react-native";

import CameraPermission from "./cameraPermission";
import GalleryPermissions from "./galleryPermission";
import MicrophonePermission from "./microphonePermission";
import CalendarPermission from "./calendarPermission";
import GpsPermission from "./gpsPermission";
import ContactsPermission from "./contactsPermission";



export default function PermissionsView() {
  

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Permisos</Text>
            <View>
          <CameraPermission />  
          <GalleryPermissions /> 
          <MicrophonePermission/>
          <GpsPermission/>
          <ContactsPermission/>
          <CalendarPermission/>
          
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

        flex: 1,
        backgroundColor: 'bisque',
        alignItems: 'center',
        
        
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'black',
    },
})