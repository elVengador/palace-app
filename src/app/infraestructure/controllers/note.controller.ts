import { useEffect, useState } from "react"

import { Note } from "../../domain/notes/notes.entity"
import { noteRepository } from "../repository/note.repository"


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useNote = () => {
    const [notes, setNotes] = useState<Note[]>([])

    const getNotes = async () => {
        console.log('get notes')
        const res = await noteRepository.getNotes() as Note[]
        console.log('RES Notes:', res)
        setNotes(res)
    }

    useEffect(() => {
        getNotes()
        console.log('useEfecct')
    }, [])

    return { notes, setNotes }
}
