import { Note } from '../../domain/notes/notes.entity'
import { api } from '../rest-api'

export const noteRepository = {
    getNotes: (): Promise<Note[]> => api.POST<Note[]>('notes/get'),
    // addNote: () => api.POST('', {}),
    // updateNote: () => api.POST('', {}),
    // removeNote: () => api.POST('', {}),
}
