import { Image, StyleSheet, Text, View } from "react-native";
import {Location } from "./locationType";

//definicion del tipo Props
type Props = {
    location: Location;//propiedad
}

export function LocationCard({ location }: Props) {

       

        return (
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={require("@/assets/images/Location1.jpg")}
                />

                <View style={styles.content}>
            <Text style={styles.name}>{location.name}</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Tipo: </Text>
                            
                        <Text style={styles.fieldValue}>{location.type}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Dimension: </Text>
                            
                        <Text style={styles.fieldValue}>{location.dimension}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Residentes: </Text>
                            
                        <Text style={styles.fieldValue}>{location.residents.length}</Text>
                    </View>
                   
                

                </View>
            </View>

        );
    }


const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 188,
        borderWidth: 1,
        borderColor: "#888",
        backgroundColor: "orange",
        padding: 5,
        marginVertical: 6,
    },
    image: {
        width: "40%",
        height: "100%",
        borderTopLeftRadius: 8,
        borderEndStartRadius: 8,
        objectFit: "cover"
    },
    content: {
        padding: 6,
        display: "flex",
        flexDirection: "column",
        gap: 4,
    },
    label: {
        fontSize: 14,
        color: "green",

    },
    name: {
        fontWeight: 700,
        fontSize: 16,
    },
    fieldValue: {
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    status: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "grey"
    },
    alive: {
        backgroundColor: "green"
    },
    dead: {
        backgroundColor: "red"
    },
    unknown: {
        backgroundColor: "blue"
    },
})