import React, { useState } from 'react';

import './Tags.scss';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { Tag } from '../../../../domain/entities';
import { TagItem } from '../../molecules/TagItem/TagItem';
import { TagForm } from '../../molecules/TagForm/TagForm';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';

interface TagsProps {
    tags?: Tag[],
    loading: boolean
}

export const Tags = ({ tags = [], loading }: TagsProps): JSX.Element => {
    const [showTagForm, setShowTagForm] = useState(false)

    const buildTags = (tags: Tag[] = []) => tags.map(cur => <TagItem
        tag={cur}
        key={cur._id}
    />)

    const handleSubmitTag = () => {
        try {
            setShowTagForm(false)
        } catch (err) {
            console.log('Err', err);
        }
    }

    const ButtonShowTagForm = <IconButton
        attributes={{ title: 'Show tag form' }}
        icon='plus'
        color='fg'
        events={{ onClick: () => setShowTagForm(true) }}
    />

    return (
        <Main>
            <>
                {loading && <h1>loading</h1>}
                <div className="tags--header">
                    <div className="options-top">
                        {!showTagForm && <>
                            <div>
                                {/* {ButtonShowHelp} */}
                            </div>
                            <div>
                                {ButtonShowTagForm}
                            </div>
                        </>}
                    </div>
                    <div className="options-bottom">
                        {
                            showTagForm &&
                            <TagForm
                                handleBeforeSubmit={handleSubmitTag}
                                destroyTagForm={() => setShowTagForm(false)}
                            />
                        }
                    </div>
                </div>
                <div className="tags--items">
                    {
                        buildTags(tags)
                    }
                </div>
            </>
        </Main >
    );
};
