import React, { useEffect, useState } from 'react';

import './Tags.scss';
import { Title } from '../../atoms/Title/Title';
import { Main } from '../../molecules/Main/Main';
import { AddTagInput, Tag } from '../../../../domain/entities';
import { TagItem } from '../../molecules/TagItem/TagItem';
import { Button } from '../../atoms/Button/Button';
import { TagForm } from '../../molecules/TagForm/TagForm';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { MUTATION_ADD_TAG, QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';


export const Tags = (): JSX.Element => {

    const { cache: clientCache } = useApolloClient()
    const [canAddTag, setCanAddTag] = useState(false)
    const [tagValue, setTagValue] = useState('')
    const { error: errorGetTagsByUser, loading, data: dataGetTagsByUser, } = useQuery<{ getTagsByUser: Tag[] }, string>(QUERY_GET_TAGS_BY_USER, {
        pollInterval: 1000 * 60 * 30,
    })
    const [addTag, { error: errorAddTag, loading: loadingAddTag }] = useMutation<{ addTag: Tag }, AddTagInput>
        (MUTATION_ADD_TAG, {
            variables: { value: tagValue },
            update(cache, { data }) {
                console.log('data', data);
                const newUserFromResponse = data?.addTag
                const existtingTags = cache.readQuery<{ getTagsByUser: Tag[] }>({ query: QUERY_GET_TAGS_BY_USER })
                console.log('is updateing QUERY_GET_TAGS_BY_USER', existtingTags);
                console.log(' is newUserFromResponse', newUserFromResponse);

                if (existtingTags && newUserFromResponse) {
                    const ttt = existtingTags?.getTagsByUser
                    console.log('TAGS:', existtingTags?.getTagsByUser);
                    const tt = [...ttt, newUserFromResponse]
                    console.log('TT', tt);
                    clientCache.writeQuery({
                        query: QUERY_GET_TAGS_BY_USER,
                        data: {
                            getTagsByUser: tt
                        }
                    })
                    setCanAddTag(false)
                }
                console.log('object');
            }
        })

    useEffect(() => {
        console.log(' -- change Tags by usar');
    }, [dataGetTagsByUser])

    const buildTags = (tags: Tag[]) => tags.map(cur => <TagItem
        tagValue={cur.value}
        date={cur.creationDate}
        key={cur._id}
    />)

    const handleAddTag = () => {
        try {
            console.log('add tag', tagValue);
            addTag()
        } catch (err) {
            console.log('Err', err);
        }
    }

    const ButtonShowTagForm = <Button content="" icon="times" type="alpha" onClick={() => setCanAddTag(false)} />
    const ButtonHideFormTag = <Button content="" icon="plus" type="alpha" onClick={() => setCanAddTag(true)} />

    return (
        <Main>
            <>
                {errorGetTagsByUser && <h1>{errorGetTagsByUser.message}</h1>}
                {errorAddTag && <h1>{errorAddTag.message}</h1>}
                {loading && <h1>loading</h1>}
                {loadingAddTag && <h1>loading</h1>}
                <div className="tags--header">
                    <Title content="Tags" />
                    {canAddTag && ButtonShowTagForm}
                    {!canAddTag && ButtonHideFormTag}
                </div>
                <button onClick={() => console.log(dataGetTagsByUser?.getTagsByUser)}>OKKK</button>
                <div className="tags--items">
                    {
                        canAddTag &&
                        <TagForm
                            value={tagValue}
                            setValue={setTagValue}
                            handleAddTag={handleAddTag}
                        />
                    }
                    {dataGetTagsByUser?.getTagsByUser &&
                        buildTags(dataGetTagsByUser?.getTagsByUser)
                    }
                </div>
            </>
        </Main >
    );
};
