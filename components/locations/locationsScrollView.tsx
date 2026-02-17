import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LocationCard } from "./locationCard";
import { useEffect, useRef, useState } from "react";
import {LocationsResult } from "./locationsResult";
import { DataSource } from "./dataSource";

export function LocationsScrollView(){

    //estado para los datos
    const[loading, setLoading] = useState(false);
    const [page, setPage] =useState<number>(1);
    const [data, setData] = useState<LocationsResult>({
        info:{
            pages:0,
            count:0,
            next:null,
            prev:null,
        },

        results: [],

    });

    //para referenciar el flatlist
    const flatListRef = useRef(null);

    const dataSource = new DataSource();

const handleEndReached=() => {
    //si no hay pag sig o esta cargando no hacer nado en caso contrario incrementar pagina
   

    //forma 2 (es mas apropiada )
    if(data.info.next && !loading){
        setPage(page + 1);
    }
}

    //cda vez que cambie el numero de pag cargar ubicaciones
    useEffect(() => {
        setLoading(true);

        dataSource.getLocations(page)
        .then((result) => {

            //la clave es conservar las ubicaciones
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
        <Text style={styles.textPaginator}>Locaciones: </Text>
        <Text style={styles.numbersPaginator}>{data.results.length}</Text>
        <Text style={styles.textPaginator}> de </Text>
        <Text style={styles.numbersPaginator}>{data.info.count}</Text>
    </View>

      </View> 

    {loading ? (
        <ActivityIndicator size= "large"/>
    ):null}

            <FlatList
            ref={flatListRef}
            data={data.results}
            renderItem={({item}) => (
                <LocationCard location={item}/>
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
        marginTop: 60,
            },
    paginator:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 16,
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
