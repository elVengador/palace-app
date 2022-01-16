import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:4100/graphql'
export const gqlClient = new GraphQLClient(endpoint, { headers: {} })
