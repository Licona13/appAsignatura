import { Link } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <ImageBackground 
        source={require('@/assets/images/fondoHome.jpg')} 
        style={styles.background}
      >
        
        <View style={styles.section_buttons}>
            <Text style={styles.text}>Home</Text>

            <Link href={"/menuApi"} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        API
                    </Text>
                </Pressable>
            </Link>

            <Link href={"/permissions"} asChild>{/*Esta ruta es solo de muestra hay que cambiarla*/} 
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Permisos
                    </Text>
                </Pressable>
            </Link>
            <Link href={"/gallery"} asChild>{/*Esta ruta es solo de muestra hay que cambiarla*/} 
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Galería
                    </Text>
                </Pressable>
            </Link>
            <Link href={"/notes"} asChild>{/*Esta ruta es solo de muestra hay que cambiarla*/} 
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Notas
                    </Text>
                </Pressable>
            </Link>
            <Link href={"/location"} asChild>{/*Esta ruta es solo de muestra hay que cambiarla*/} 
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Ubicaciones
                    </Text>
                </Pressable>
            </Link>

           
            

        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },

  section_buttons:{
     alignItems:"center",
    marginTop:80
  },

  button:{
    width:"35%",
    height:38,
    backgroundColor:"green",
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:10,
    

    },

    buttonText:{
        textAlign:"center",
        justifyContent:"center",
        fontSize:20

    },
  


});
