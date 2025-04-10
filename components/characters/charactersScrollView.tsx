import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Character } from "./characterType";
import { CharacterCard } from "./characterCard";
import { useEffect, useRef, useState } from "react";
import { CharactersResult } from "./charactersResult";
import { DataSource } from "./dataSource";

export function CharactersScrollView(){

    //estado para los datos
    const[loading, setLoading] = useState(false);
    const [page, setPage] =useState<number>(1);
    const [data, setData] = useState<CharactersResult>({
        info:{
            pages:0,
            count:0,
            next:null,
            prev:null,
        },

        results: [],

    });

const characters: Character[] = [
    {
        id:1,
        name:"Rick Sanchez",
        status:"Alive",
        origin: {
            name: "Tierra",},

        location:{
            name:"Tierra",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        species:"Human",

    },
];
    //para referenciar el flatlist
    const flatListRef = useRef(null);

    const dataSource = new DataSource();

const handleEndReached=() => {
    //si no hay pag sig o esta cargando no hacer nado en caso contrario incrementar pagina
    {/*if(!data.info.next || loading ){
        return;
    }

    setPage(page + 1);*/}

    //forma 2 (es mas apropiada )
    if(data.info.next && !loading){
        setPage(page + 1);
    }
}

    //cda vez que cambie el numero de pag cargar personajes
    useEffect(() => {
        setLoading(true);

        dataSource.getCharacters(page)
        .then((result) => {

            //la clave es conservar los personajes
            //(conservar el estado actual)
            setData((prevData) => ({
                results: [...prevData.results, ...result.results],
                info: result.info,
            }));
        })
       
        .catch((error) => {
            Alert.alert(`Error: ${error.message}`);
        })
        .finally(() => {
            setLoading(false);
        });

    },[page]);

    return(
        <View style={styles.ScrollView}>

    <View style={styles.paginator}>
   
    <View style={styles.pageInfo}>
        <Text style={styles.textPaginator}>Personajes: </Text>
        <Text style={styles.numbersPaginator}>{data.results.length}</Text>
        <Text style={styles.textPaginator}> de </Text>
        <Text style={styles.numbersPaginator}>{data.info.count}</Text>
    </View>

  {/*se quitaron los botones*/}

    </View> 

    {loading ? (
        <ActivityIndicator size= "large"/>
    ):null}

           {/*</ActivityIndicator>{ loading ? null:data.results.map((item) => (
                <CharacterCard
                    key={item.id}
                    character={item}
                />
            ))}*/}

            <FlatList
            ref={flatListRef}
            data={data.results}
            renderItem={({item}) => (
                <CharacterCard character={item}/>
            )}

            keyExtractor={item => item.id.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={loading}// se le indica al flatlist que esta en cargando
            ListFooterComponent={loading? 
            <ActivityIndicator size="large"/>// si esta cargando se muestra
            :undefined
            }
            />

        </View>
    );
}

const styles = StyleSheet.create({
    ScrollView:{
        width:"100%",
        marginTop: 5,
            },
    paginator:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 7,
        backgroundColor:"bisque",
        height:60,
        borderWidth:2,
        borderColor:"#083452"
    },
    button:{
        backgroundColor:"#083452",
        color:"#FFF",
        paddingVertical:8,
        paddingHorizontal:16,
    },
    buttonText:{
        fontSize:18,
        color: "#FFF"
    },
    pageInfo:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:4,
    },
    textPaginator:{
        fontWeight:"bold",
        fontSize:25,
    },
    numbersPaginator:{
        color:"#52b69a",
        fontSize:25,
        fontStyle:"italic"
    }
});