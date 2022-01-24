import React, { useState } from 'react';

import './Tags.scss';
import { Title } from '../../atoms/Title/Title';
import { Main } from '../../molecules/Main/Main';
import { Tag } from '../../../../domain/entities';
import { TagItem } from '../../molecules/TagItem/TagItem';
import { Button } from '../../atoms/Button/Button';
import { TagForm } from '../../molecules/TagForm/TagForm';
import { useQuery } from '@apollo/client';
import { QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';


export const Tags = (): JSX.Element => {

    const [canAddTag, setCanAddTag] = useState(false)
    const { error: errorGetTagsByUser, loading, data: dataGetTagsByUser } = useQuery<{ getTagsByUser: Tag[] }, string>(QUERY_GET_TAGS_BY_USER, {
        pollInterval: 1000 * 60 * 30,
    })

    const buildTags = (tags: Tag[]) => tags.map(cur => <TagItem
        tag={cur}
        key={cur._id}
    />)

    const handleSubmitTag = () => {
        try {
            setCanAddTag(false)
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
                {loading && <h1>loading</h1>}
                <div className="tags--header">
                    <div className="options-top">
                        <Title content="Tags" />
                        {canAddTag && ButtonShowTagForm}
                        {!canAddTag && ButtonHideFormTag}
                    </div>
                    <div className="options-bottom">
                        {
                            canAddTag &&
                            <TagForm handleBeforeSubmit={handleSubmitTag} />
                        }
                    </div>
                </div>
                <div className="tags--items">
                    {
                        dataGetTagsByUser?.getTagsByUser &&
                        buildTags(dataGetTagsByUser?.getTagsByUser)
                    }
                </div>
            </>
        </Main >
    );
};
