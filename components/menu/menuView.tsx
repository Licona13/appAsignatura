import { Link } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MenuView() {
  return (
    <View style={styles.main}>
      <ImageBackground 
        source={require('@/assets/images/fondo1.jpg')} 
        style={styles.background}
      >
        
        <View style={styles.section_buttons}>
            <Text style={styles.text}>Rick & Morty</Text>

            <Link href={"/characters"} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Personajes
                    </Text>
                </Pressable>
            </Link>

            <Link href={"/episodes"} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Episodios
                    </Text>
                </Pressable>
            </Link>

            <Link href={"/locations"} asChild>
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
    color: "yellow",
    fontSize: 25,
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
