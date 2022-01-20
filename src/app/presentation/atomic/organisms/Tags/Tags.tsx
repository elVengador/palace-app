import React, { useState } from 'react';

import './Tags.scss';
import { Title } from '../../atoms/Title/Title';
import { Main } from '../../molecules/Main/Main';
import { Tag } from '../../../../domain/entities';
import { TagItem } from '../../molecules/TagItem/TagItem';
import { Button } from '../../atoms/Button/Button';
import { TagForm } from '../../molecules/TagForm/TagForm';


export const Tags = (): JSX.Element => {

    const [canAddTag, setCanAddTag] = useState(false)
    const [tagValue, setTagValue] = useState('')

    const tags: Tag[] = [
        {
            _id: '1',
            userId: '9q24u239423',
            value: 'this is a tag',
            state: 'ENABLE',
            updateDate: '12/12/12',
            creationDate: '10/12/12'
        },
        {
            _id: '2',
            userId: '9q24u239423',
            value: 'this is other tag',
            state: 'ENABLE',
            updateDate: '11/16/12',
            creationDate: '11/12/12'
        },
    ]

    const buildNotes = tags.map(cur => <TagItem
        tagValue={cur.value}
        date={cur.creationDate}
        key={cur._id}
    />)

    const handleAddTag = () => {
        console.log('add tag', tagValue);
    }

    return (
        <Main>
            <>
                <div className="tags--header">
                    <Title content="Tags" />
                    {canAddTag && <Button content="" icon="times" type="alpha" onClick={() => setCanAddTag(false)} />}
                    {!canAddTag && <Button content="" icon="plus" type="alpha" onClick={() => setCanAddTag(true)} />}
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
