
import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraComponent } from "./cameraView";
import { Photopreview } from "./photoPreview";

import * as PhotoPicker from 'expo-image-picker';
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
/**
 * Componente donde seleccionaremos el origen de
 * la imagen: Camara o galeria
 * @returns
 *
 */
interface ImagePickerProps {
    onImageSelected: (uri: string) => void;
  }


export function ImagePicker({ onImageSelected }: ImagePickerProps){

    const [open,setOpen] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);

    const [image, setImage]= useState<string | undefined | null>(null);

    const onPictureTaked = (uri?:string) =>{
        setCameraOpen(false);
        setImage(uri);
    }

    const onNewPhoto = () => {
        setImage(undefined);
        setCameraOpen(true);
    }

const onSavePhoto =(uri : string) => {

//ToDo guardar foto
onImageSelected(uri);

//reset del componente
Alert.alert("Foto guardada.");
setOpen(false);
setImage(undefined);

};

//imagen desde la galeria
const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await PhotoPicker.launchImageLibraryAsync({
      //mediaTypes: ['images'],
      mediaTypes:PhotoPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    const renderMenu = (//constante 
        <View style={styles.modalContainer}>
        <Text style={styles.title}>Origen de la imagen</Text>

    <View style={styles.buttonsWrapper}>
            <TouchableOpacity style={styles.button}
            onPress={() => setCameraOpen(true)}
            >
                
                <Text
                >Cámara</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
            onPress={pickImage}
            >
                <Text
                >Galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancel}
        onPress={() => setOpen(false)}>
                <Text>Cancelar</Text>
            </TouchableOpacity>
            
        </View>
        
    </View>

    );

    return(
        <>
        <View>
        <TouchableOpacity
      
        onPress={() => setOpen(true)}
        >
            <Ionicons
                name ="camera-outline"
                size={64}
                color="orange"
            />
        </TouchableOpacity>
        </View>
        <Modal
        
            visible={open}
            transparent={true}
            animationType="slide"
        >

        {/*
        si la camara no esta abierta
         y tampoco hay imagen, entonces 
         mostrar el menu
         */ }
       {!cameraOpen && !image ? renderMenu : null}

       {cameraOpen ? (
        <CameraComponent
        onCancel={() => setCameraOpen(false)}
        onTakePicture = {onPictureTaked}
        />
       ): null}

{/*Si hay imagen, mostrar Photopreview*/}
{image ? (
    <Photopreview
    uri={image}
    onCancel={() => setImage(undefined)}
    newPhoto={onNewPhoto}
    onSave={onSavePhoto}
    />
): null}

        </Modal>

        </>
    );
}

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:"bisque"
    },
    title:{
        fontWeight:"bold",
        fontSize:24,
        paddingBottom:25,
        textAlign:"center",
    },
    button:{
        width:200,
        height:38,
        backgroundColor:"orange",
        borderRadius:8,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:5,
        paddingHorizontal:15
        
        },
    buttonCancel:{
        width:200,
        height:37,
        backgroundColor:"red",
        borderRadius:8,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:5,
        paddingHorizontal:15
        
        },
        buttonsWrapper: {
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        
           

})

