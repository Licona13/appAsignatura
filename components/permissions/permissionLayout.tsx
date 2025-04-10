import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props ={
    icon: any;
    title: String;
    granted: boolean;
    requestPermission: ()=>void;

}


export default function PermissionsLayout( {icon, title, granted, requestPermission}: Props){ 

    return(
        <View style={styles.container}>
            <Ionicons name={icon} size={24} color="white" />
            <Text style={styles.title}>{title}</Text>

            {granted ? (
                <Ionicons name="checkmark-outline" size={24} color="green" />
            ):(
                <TouchableOpacity 
                style={styles.button}
                onPress={requestPermission}>
                    <Text style={styles.buttonText}> Autorizar </Text>
                </TouchableOpacity>
                    
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    //flex: 1,
    
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 16, 
    paddingVertical: 10,
    marginTop:10
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'white',
    },
    button:{
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginLeft:15
        
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
    }
})