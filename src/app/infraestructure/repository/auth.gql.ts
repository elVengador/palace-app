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

export const MUTATION_SIGN_IN = gql`
    mutation signIn($email:String!,$password:String!){
        signIn(signInInput:{
            email:$email,
            password:$password
        }){
            accessToken,
            refreshToken
        }
    }
`
