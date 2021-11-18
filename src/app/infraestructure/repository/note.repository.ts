import { api } from '../rest-api'

export const noteRepository = {
    getNotes: () => api.GET(''),
    addNote: () => api.POST('', {}),
    updateNote: () => api.POST('', {}),
    removeNote: () => api.POST('', {}),
}
