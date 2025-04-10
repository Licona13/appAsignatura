// AllNotesScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Note } from './note';
import NotesCard from './noteCard';
import { NoteModal } from './noteModal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNotes } from './notesContext';

export function AllNotesScreen() {
  const { notes, updateNote, deleteNote } = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleSaveEditedNote = async (updatedNote: Note) => {
    try {
      await updateNote(updatedNote);
      setSelectedNote(null);
    } catch (error) {
      console.error('Error al guardar la nota editada:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  const handleToggleComplete = async (note: Note) => {
    try {
      const updatedNote = { ...note, is_completed: !note.is_completed };
      await updateNote(updatedNote);
    } catch (error) {
      console.error('Error al actualizar el estado de la nota:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <TouchableOpacity style={styles.noteInfo} onPress={() => handleEditNote(item)}>
              <Text style={[styles.noteTitle, item.is_completed && styles.completedTitle]}>
                {item.title}
              </Text>
              <Text style={styles.noteContent}>{item.content}</Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleToggleComplete(item)}>
                <MaterialCommunityIcons
                  name={item.is_completed ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
                  size={24}
                  color={item.is_completed ? 'green' : 'gray'}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEditNote(item)}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color="blue"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={24}
                  color="red"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <NoteModal
        open={!!selectedNote}
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
        onSaved={handleSaveEditedNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'bisque',
    paddingTop: 60,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  noteInfo: {
    flex: 1,
    marginRight: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  noteContent: {
    fontSize: 16,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 15,
  },
});