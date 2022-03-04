import { useState } from "react"
import { NoteOutput } from "../../../../domain/entities"

export type NotesPageState = 'LIST' | 'VIEW' | 'ADD' | 'EDIT'

export const useNotePage = (setTitle: React.Dispatch<React.SetStateAction<string>>): {
    notesPageState: NotesPageState;
    selectedNote: NoteOutput | null;
    stateToShowNotes: () => void;
    stateToShowPreviewNote: (note: NoteOutput | null) => void;
    stateToAddNote: () => void;
    stateToEditNote: (note: NoteOutput) => void;
} => {
    const [notesPageState, setNotesPageState] = useState<NotesPageState>('LIST')
    const [selectedNote, setSelectedNote] = useState<NoteOutput | null>(null)

    const stateToShowNotes = () => {
        setSelectedNote(null)
        setNotesPageState('LIST')
        setTitle('Notes')
    }

    const stateToShowPreviewNote = (note: NoteOutput | null) => {
        if (note) { setSelectedNote(note) }
        setNotesPageState('VIEW')
        setTitle('Note')
    }

    const stateToAddNote = () => {
        setSelectedNote(null)
        setNotesPageState('ADD')
        setTitle('Add Note')
    }

    const stateToEditNote = (note: NoteOutput) => {
        setSelectedNote(note)
        setNotesPageState('EDIT')
        setTitle('Edit note')
    }

    return {
        notesPageState,
        selectedNote,
        stateToShowNotes,
        stateToShowPreviewNote,
        stateToAddNote,
        stateToEditNote
    }
}
