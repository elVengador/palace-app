import { gql } from 'graphql-request';

export const MUTATION_ADD_TAG = gql`
    mutation addTag($value:String!){
        addTag(addTagInput:{
            value:$value
        })
    }
`

export const QUERY_GET_TAGS_BY_USER = gql`
    query getTagsByUser($userId:ID!){
        getTagsByUser(userId:$userId){
            _id
            userId
            value
            state
            updateDate
            creationDate
        }
    }
`
