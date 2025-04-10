import { FlatList, Image, StyleSheet, View } from "react-native";
import { ImagePicker } from "../imagePicker/imagePicker";
import { useState } from "react";

export function ImagesGallery(){

    //ToDo estado para las imagenes: string[]
    const [images, setImages] = useState<string[]>([]);

    //Todo:Funcion para recibir la imagen desde ImagePicker y pasarla ala coleccion o estado de imageknes
    const handleImageSelected = (uri: string) => {
        setImages((prevImages) => [...prevImages, uri]);
      };

    return(
        <View
        style={styles.container}
        >

            <ImagePicker
            onImageSelected={handleImageSelected}
            //ToDo: prop para recibir la imagen
            />

            {/*ToDo Mostrar el grid de imagenes*/}
            <FlatList
  data={images}
  keyExtractor={(item, index) => index.toString()}
  numColumns={3}
  contentContainerStyle={styles.grid}
  renderItem={({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  )}
/>



        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:45,
        paddingHorizontal:24,
    },
    grid: {
        marginTop: 20,
        gap: 10,
      },
      image: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 10,
      },
})



