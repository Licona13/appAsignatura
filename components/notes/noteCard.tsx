import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Note } from "./note";

export default function NotesCard({ note, onDelete }: { note: Note, onDelete: () => void }) {
    return (
        <View style={styles.notesCard}>
            <View style={styles.recipeIconContainer}>
                <MaterialCommunityIcons name="ballot-outline" size={40} color="#4CAF50" />
            </View>
            <View style={styles.recipeInfoContainer}>
                <Text style={styles.recipeName}>{note.title}</Text>
                <Text style={styles.recipeDescription}>{note.content}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    notesCard: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFFFFF',  
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    recipeIconContainer: {
        marginRight: 15,
        borderRadius: 20,
        padding: 8,
    },
    recipeInfoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    recipeDescription: {
        fontSize: 14,
        color: '#757575',
        marginVertical: 5,
    },
    actionsContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10, 
    },
});
