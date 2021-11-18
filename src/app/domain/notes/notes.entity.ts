export interface Note {
    id: string,
    text: string,
    date: string,
}

export const mockNote = (): Note => ({
    id: '1',
    text: 'this is a note example',
    date: '1/1/1',
})
