import { Image, StyleSheet, Text, View } from "react-native";
import { Character } from "./characterType";

//definicion del tipo Props
type Props = {
    character: Character;//propiedad
}

export function CharacterCard({ character }: Props) {

    const getStatusColor = () => {

        switch (character.status) {
            case "Alive":
                return styles.alive;
            case "Dead":
                return styles.dead;
            case "Unknown":
                return styles.unknown;
            default:
                return styles.unknown;
        }
    }

    {

        return (
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={{ uri: character.image }}
                />

                <View style={styles.content}>

                    <Text style={styles.name}>
                        {character.name}
                    </Text>

                    <View>
                        <Text style={styles.label}>Estatus y especie: </Text>
                        <View style={styles.row}>
                            <View style={[styles.status, getStatusColor()]} />
                            <Text style={styles.fieldValue}>
                                {character.status} - {character.species}
                            </Text>

                        </View>

                    </View>

                    <Text style={styles.label}>Origen: </Text>
                    <Text style={styles.fieldValue}>
                    {character.origin.name}
                </Text>

                </View>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 140,
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