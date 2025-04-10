import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Note } from './note';
import { NoteModal } from './noteModal';
import NotesCard from './noteCard';
import { useNotes } from './notesContext';

export function NotesView() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [selected, setSelected] = useState<Note | null>(null);

  const handleAddModal = () => {
    setSelected({
      title: "",
      content: "",
    } as Note);
  };

  const onSaveNote = async (note: Note) => {
    try {
      if (!note.id) {
        await addNote(note);
      } else {
        await updateNote(note);
      }
      setSelected(null);
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes.slice(0, 5)}
        renderItem={({ item }) => (
          <NotesCard
            key={item.id}
            note={item}
            onDelete={() => handleDeleteNote(item.id)}
          />
        )}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <NoteModal
        open={!!selected}
        note={selected}
        onClose={() => setSelected(null)}
        onSaved={onSaveNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    paddingTop: 100,
    backgroundColor: "bisque",
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});