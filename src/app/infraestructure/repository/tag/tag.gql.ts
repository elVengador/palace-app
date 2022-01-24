import { gql } from '@apollo/client';

export const MUTATION_ADD_TAG = gql`
    mutation addTag($value:String!){
        addTag(addTagInput:{
                value:$value
        }){
            _id
            userId
            value
            state
            updateDate
            creationDate
        }
    }

`

export const QUERY_GET_TAGS_BY_USER = gql`
    query getTagsByUser{
        getTagsByUser{
            _id
            userId
            value
            state
            updateDate
            creationDate
        }
    }
`

export const MUTATION_UPDATE_TAG = gql`
    mutation updateTag($tagId: ID!, $updateTagInput: UpdateTagInput!) {
        updateTag(tagId: $tagId, updateTagInput: $updateTagInput) {
            _id
            userId
            value
            creationDate
            updateDate
            state
        }
    }

`
