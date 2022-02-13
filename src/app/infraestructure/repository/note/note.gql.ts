import { gql } from '@apollo/client';

export const MUTATION_ADD_NOTE = gql`
    mutation AddNote($addNoteInput: AddNoteInput) {
        addNote(addNoteInput: $addNoteInput) {
            _id
            tags {
                value
                _id
                userId
                state
                updateDate
                creationDate
            }
            value
            state
            updateDate
            creationDate
            creationUser
        }
    }
`

export const QUERY_NOTES_BY_USER = gql`
    query Query {
        getNotesByUser {
            _id
            tags {
                value
                _id
                userId
                state
                updateDate
                creationDate
            }
            value
            state
            updateDate
            creationDate
            creationUser
        }
    }
`

export const QUERY_NOTES_BY_TAG = gql`
    query GetNotesByTag($tagId: ID!) {
        getNotesByTag(tagId: $tagId) {
            _id
            state
            value
            updateDate
            creationDate
            creationUser
            tags {
                creationDate
                updateDate
                state
                value
                userId
                _id
            }
        }
    }
`
