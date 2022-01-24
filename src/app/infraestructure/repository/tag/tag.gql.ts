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

// export const MUTATION_ADD_TAG2 = gql`
//     mutation addTag2($value:String!){
//         addTag2(addTagInput:{
//             value:$value
//         }){
//             id
//             userId
//             value
//             state
//             updateDate
//             creationDate
//         }
//     }
// `

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
