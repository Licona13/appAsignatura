import { Ionicons } from "@expo/vector-icons";
import { Button, Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props ={
    uri: string;
    onSave: (uri:string) => void;
    onCancel: () => void;
    newPhoto: () => void;
}

export function Photopreview({

    uri,
    onSave,
    onCancel,
    newPhoto,
} : Props){
    
    return(
        <View style={styles.container}>
            <Image
            source ={{ uri }}
            style ={styles.image}

            />

            <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => onCancel ()}
                >
            <Ionicons
                name ="close"
                size={32}
                color="black"
            />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onSave (uri)}
                >
            <Ionicons
                name ="save-outline"
                size={64}
                color="black"
            />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={newPhoto}
                >
            <Ionicons
                name ="camera-outline"
                size={32}
                color="black"
            />
            </TouchableOpacity>

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '90%',
    height: '70%',
    resizeMode:"contain"
},
  buttonContainer:{
    position:"absolute",
    bottom:48,
    left:0,
    width:"100%",
    flexDirection:"row",
    backgroundColor:"transparent",
    alignItems:"center",
    justifyContent:"space-around",
  }


});
   
