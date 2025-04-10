import React, { createContext, useContext, useState, useEffect } from "react";
import { Note } from "./note";
import { Datasource } from "./dataSource";

interface NotesContextType {
  notes: Note[];
  addNote: (note: Partial<Note>) => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  toggleNoteStatus: (noteId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const datasource = new Datasource();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const loadedNotes = await datasource.getNotes();
      setNotes(loadedNotes);
      setError(null);
    } catch (err) {
      setError("Error al cargar las notas");
      console.error("Error al cargar notas:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (note: Partial<Note>) => {
    try {
      setLoading(true);
      const newNote = await datasource.saveNote({
        ...note,
        created_at: new Date().toISOString(),
      });
      
      if (newNote) {
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setError(null);
      } else {
        throw new Error("Error al crear la nota");
      }
    } catch (err) {
      setError("Error al crear la nota");
      console.error("Error al crear nota:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (note: Note) => {
    try {
      setLoading(true);
      const updatedNote = await datasource.saveNote(note);
      
      if (updatedNote) {
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
        );
        setError(null);
      } else {
        throw new Error("Error al actualizar la nota");
      }
    } catch (err) {
      setError("Error al actualizar la nota");
      console.error("Error al actualizar nota:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      setLoading(true);
      await datasource.deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      setError(null);
    } catch (err) {
      setError("Error al eliminar la nota");
      console.error("Error al eliminar nota:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleNoteStatus = async (noteId: string) => {
    try {
      setLoading(true);
      const note = notes.find((n) => n.id === noteId);
      if (!note) throw new Error("Nota no encontrada");

      const updatedNote = await datasource.updateNoteStatus(
        noteId,
        !note.is_completed
      );

      if (updatedNote) {
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === noteId ? updatedNote : n))
        );
        setError(null);
      } else {
        throw new Error("Error al actualizar el estado de la nota");
      }
    } catch (err) {
      setError("Error al actualizar el estado de la nota");
      console.error("Error al actualizar estado de nota:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        deleteNote,
        toggleNoteStatus,
        loading,
        error,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};