import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; 

export function LocationListView() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener las ubicaciones 
  useEffect(() => {
    async function fetchLocations() {
      try {
        const querySnapshot = await getDocs(collection(db, 'locations'));
        const locationsList: any[] = [];
        querySnapshot.forEach((doc) => {

            const data = doc.data();
            // Verifica si hay un timestamp válido antes de acceder a 'seconds'
            if (data.timestamp) {


          locationsList.push({
            id: doc.id,
            ...doc.data(),
          });
        }
        });
        setLocations(locationsList);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las ubicaciones: ', error);
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando ubicaciones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Ubicaciones</Text>
      
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationText}>
              <Text style={styles.label}>Latitud: </Text>
              <Text style={styles.coordinate}>{item.latitude}</Text>
              <Text style={styles.label}>, Longitud: </Text>
              <Text style={styles.coordinate}>{item.longitude}</Text>
            </Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp.seconds * 1000).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationItem: {
    padding: 15,
    backgroundColor: 'bisque',
    borderRadius: 8,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: 'black'
},
  coordinate: {
    fontSize: 16,
    color: 'green', 
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
});
