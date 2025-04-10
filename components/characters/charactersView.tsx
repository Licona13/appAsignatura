import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Character } from "./characterType";
import { CharacterCard } from "./characterCard";
import { useEffect, useState } from "react";
import { CharactersResult } from "./charactersResult";
import { DataSource } from "./dataSource";

export function CharactersView() {

    //estado para los datos
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<CharactersResult>({
        info: {
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },

        results: [],

    });

    {/*const characters: Character[] = [
        {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            origin: "Tierra",
            location: {
                name: "Tierra",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            species: "Human",

        },
    ];*/}

    const dataSource = new DataSource();
    //cda vez que cambie el numero de pag cargar personajes
    useEffect(() => {
        setLoading(true);

        dataSource.getCharacters(page)
            .then((result) => {
                setData(result);
            })

            .catch((error) => {
                Alert.alert(`Error: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [page]);

    return (
        <View style={styles.ScrollView}>

            <View style={styles.paginator}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setPage(page - 1) }}
                    disabled={data.info.prev === null}>
                    <Text style={styles.buttonText}>Anterior</Text>
                </TouchableOpacity>

                <View style={styles.pageInfo}>
                    <Text style={styles.textPaginator}>Página</Text>
                    <Text style={styles.numbersPaginator}>{page}</Text>
                    <Text style={styles.textPaginator}> de </Text>
                    <Text style={styles.numbersPaginator}>{data.info.pages}</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setPage(page + 1) }}
                    disabled={data.info.next === null}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>

            </View>

            {loading ? (
                <ActivityIndicator size="large" />
            ) : null}

            {/*</ActivityIndicator>{ loading ? null:data.results.map((item) => (
                <CharacterCard
                    key={item.id}
                    character={item}
                />
            ))}*/}

            <FlatList
                data={data.results}
                renderItem={({ item }) => (
                    <CharacterCard character={item} />
                )}

                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 74 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ScrollView: {
        width: "100%",
        marginTop: 5,

    },
    paginator: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        height: 60,
        backgroundColor: "bisque"
    },
    button: {
        backgroundColor: "#083452",
        color: "#FFF",
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4
    },
    buttonText: {
        fontSize: 18,
        color: "#FFF"
    },
    pageInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    numbersPaginator: {
        color: "#52b69a",
        fontSize: 21,
    },
    textPaginator: {
        fontWeight: "bold",
        fontSize: 18,
    },
});