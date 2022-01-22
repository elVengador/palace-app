import { gql } from '@apollo/client';

export const MUTATION_ADD_TAG = gql`
    mutation addTag($value:String!){
        addTag(addTagInput:{
            value:$value
        })
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
