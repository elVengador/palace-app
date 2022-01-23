import React, { useState } from 'react';

import './Tags.scss';
import { Title } from '../../atoms/Title/Title';
import { Main } from '../../molecules/Main/Main';
import { AddTagInput, Tag } from '../../../../domain/entities';
import { TagItem } from '../../molecules/TagItem/TagItem';
import { Button } from '../../atoms/Button/Button';
import { TagForm } from '../../molecules/TagForm/TagForm';
import { useMutation, useQuery } from '@apollo/client';
import { MUTATION_ADD_TAG, QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';
// import { useNavigate } from 'react-router-dom';


export const Tags = (): JSX.Element => {

    const [canAddTag, setCanAddTag] = useState(false)
    const [tagValue, setTagValue] = useState('')
    const { error: errorGetTagsByUser, loading, data: dataGetTagsByUser, } = useQuery<{ getTagsByUser: Tag[] }, string>(QUERY_GET_TAGS_BY_USER)
    const [addTag, { error: errorAddTag }] = useMutation<{ addTag: string }, AddTagInput>
        (MUTATION_ADD_TAG, { variables: { value: tagValue } })

    // const navigate = useNavigate();

    const buildNotes = dataGetTagsByUser?.getTagsByUser ? dataGetTagsByUser.getTagsByUser.map(cur => <TagItem
        tagValue={cur.value}
        date={cur.creationDate}
        key={cur._id}
    />) : []

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
                <div className="tags--header">
                    <Title content="Tags" />
                    {canAddTag && ButtonShowTagForm}
                    {!canAddTag && ButtonHideFormTag}
                </div>
                <div className="tags--items">
                    {
                        canAddTag &&
                        <TagForm
                            value={tagValue}
                            setValue={setTagValue}
                            handleAddTag={handleAddTag}
                        />
                    }
                    {buildNotes}
                </div>
            </>
        </Main>
    );
};
