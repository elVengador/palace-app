import { gql } from 'graphql-request';

export const MUTATION_SIGN_UP = gql`
    mutation($nick:String!,$email:String!,$password:String!){
        signUp(signUpInput:{
            nick:$nick,
            email:$email,
            password:$password
        })
    }
`
