import { Variables } from "graphql-request";
import { AddTagInput, Tag } from "../../../domain/entities";
import { gqlClient } from "../../graphql";
import { MUTATION_ADD_TAG, QUERY_GET_TAGS_BY_USER } from "./tag.gql";
// import { MUTATION_SIGN_IN, MUTATION_SIGN_UP } from './auth.gql';

export const tagRepository = {
    addTag: async (params: AddTagInput): Promise<string> => {
        return await gqlClient.request<string>(MUTATION_ADD_TAG, params)
    },
    getTagsByUser: async (params: Variables): Promise<Tag[]> => {
        const res = await gqlClient.request<{ getTagsByUser: Tag[] }>(QUERY_GET_TAGS_BY_USER, params)
        console.log('GTBYU: RES', res);
        return res.getTagsByUser
    }
}
