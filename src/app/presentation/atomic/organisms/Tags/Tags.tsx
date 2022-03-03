import React, { useContext, useState } from 'react';

import './Tags.scss';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { Tag } from '../../../../domain/entities';
import { TagItem } from '../../molecules/TagItem/TagItem';
import { TagForm } from '../../molecules/TagForm/TagForm';
import { useQuery } from '@apollo/client';
import { QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';
import { useNavigate } from 'react-router';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';
import { AlertContext } from '../../../../../App';

export const Tags = (): JSX.Element => {
    const alertContext = useContext(AlertContext)
    const [showTagForm, setShowTagForm] = useState(false)
    const navigate = useNavigate();
    const { loading, data: dataGetTagsByUser } = useQuery<{ getTagsByUser: Tag[] }, string>(QUERY_GET_TAGS_BY_USER, {
        pollInterval: 1000 * 60 * 30,
        onError: (err) => {
            console.log(err);
            if (err.message === 'Unauthorized') {
                console.log('dont hast token');
                navigate('/auth')
            }
            alertContext?.addErrorAlert()
        }
    })

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

    // const ButtonShowTagForm = <Button content="" size='sm' icon="times" events={{ onClick: () => setCanAddTag(false) }} />
    const ButtonShowTagForm = <IconButton
        attributes={{ title: 'Show tag form' }}
        icon='plus'
        color='fg'
        events={{ onClick: () => setShowTagForm(true) }}
    />

    // const ButtonShowHelp = <IconButton
    //     attributes={{ title: 'Show help about tags' }}
    //     icon='question'
    //     color='fg'
    //     events={{ onClick: () => console.log('show help tags') }}
    // />
    // const ButtonHideTagForm = <Button content="" size='sm' icon="plus" events={{ onClick: () => setCanAddTag(true) }} />

    return (
        <Main>
            <>
                {/* {errorGetTagsByUser && <h1>{errorGetTagsByUser.message}</h1>} */}
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
                        buildTags(dataGetTagsByUser?.getTagsByUser)
                    }
                </div>
            </>
        </Main >
    );
};
