export type Note = {
    id: string;
    title: string;
    content: string;
    created_at: string; // o Date, si prefieres manejarlo como objeto de fecha
    is_completed?: boolean;
  };
  