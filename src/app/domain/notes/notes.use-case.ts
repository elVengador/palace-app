import { Note } from "./notes.entity"

export type AddNote = (note: Note) => Note
export type GetNotes = () => Note[]
export type UpdateNote = (note: Note) => Note
export type RemoveNote = (id: string) => Note
