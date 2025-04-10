import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Note } from "./note";
import { useState, useEffect } from "react";

type Props = {
  note: Note | null,
  open: boolean,
  onSaved: (note: Note) => void;
  onClose: () => void;
}

export function NoteModal({
  note,
  open,
  onSaved,
  onClose,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (open && note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    } else if (open && !note) {
      setTitle("");
      setContent("");
    }
  }, [open, note]);

  const handleSave = () => {
    if (!note) return;

    onSaved({
      ...note,
      title: title.trim(),
      content: content.trim(),
      // No asignamos created_at aquí si queremos que Supabase lo maneje
      ...(note.id ? {} : { created_at: new Date().toISOString() }), // Si no tiene ID, es nueva
    });
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Título de la nota"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            placeholder="Texto de la nota"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={content}
            onChangeText={setContent}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});