import { useEffect, useState } from "react"

import { Note } from "../../domain/notes/notes.entity"
import { noteRepository } from "../repository/note.repository"

export const useNote = () => {
    const [notes, setNotes] = useState<Note[]>([])

    const getNotes = async () => {
        const res = await noteRepository.getNotes() as Note[]
        setNotes(res)
    }

    useEffect(() => {
        getNotes()
    }, [])

    return { notes, setNotes }
}
