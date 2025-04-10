// Datasource.ts
import { supabase } from "@/lib/supabase";
import { Note } from "./note";

export class Datasource {
  constructor() {}

  async getNotes(): Promise<Note[]> {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener notas:", error);
      return [];
    }

    return data || [];
  }

  async saveNote(note: Partial<Note>): Promise<Note | null> {
    try {
      if (!note.id) {
        // Crear nueva nota
        const { data, error } = await supabase
          .from("notes")
          .insert({
            title: note.title,
            content: note.content,
            created_at: note.created_at,
            is_completed: note.is_completed || false
          })
          .select()
          .single();

        if (error) {
          console.error("Error al crear nota:", error);
          return null;
        }

        return data;
      } else {
        // Actualizar nota existente
        const { data, error } = await supabase
          .from("notes")
          .update(note)
          .eq("id", note.id)
          .select()
          .single();

        if (error) {
          console.error("Error al actualizar nota:", error);
          return null;
        }

        return data;
      }
    } catch (error) {
      console.error("Error en saveNote:", error);
      return null;
    }
  }

  async updateNoteStatus(noteId: string, is_completed: boolean): Promise<Note | null> {
    const { data, error } = await supabase
      .from("notes")
      .update({ is_completed })
      .eq("id", noteId)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar el estado de la nota:", error);
      return null;
    }

    return data;
  }

  async deleteNote(noteId: string) {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);

    if (error) {
      console.error("Error al eliminar nota:", error);
    }

    return { error };
  }
}