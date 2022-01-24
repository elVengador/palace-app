import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TagItem.scss';
import { Title } from '../../atoms/Title/Title';
import { Input, InputStatus } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { formatDate } from '../../../../application/utils/dates';
import { Tag, UpdateTagInput } from '../../../../domain/entities';
import { useMutation } from '@apollo/client';
import { MUTATION_UPDATE_TAG, QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';


interface TagItemProps {
    tag: Tag
    startEditting?: boolean
}

export const TagItem = ({
    // tagValue = '',
    // date = '00/00/00',
    startEditting = false,
    ...props
}: TagItemProps): JSX.Element => {

    // const onClickNote = () => props.onClick()
    const [value, setValue] = useState(props.tag.value)
    const [isEditting, setIsEditting] = useState(startEditting)
    const [stateTagInput, setStateTagInput] = useState<InputStatus>('success')

    const [updateTag, { error: errorUpdateTag, loading: loadingUpdateTag }] =
        useMutation<{ updateTag: Tag }, { tagId: string, updateTagInput: UpdateTagInput }>
            (MUTATION_UPDATE_TAG, {
                variables: { tagId: props.tag._id, updateTagInput: { value } },
                update(cache, { data }) {
                    const updatedTag = data?.updateTag
                    const existtingTags = cache.readQuery<{ getTagsByUser: Tag[] }>({ query: QUERY_GET_TAGS_BY_USER })
                    if (existtingTags && updatedTag) {
                        const tagsByUser = existtingTags?.getTagsByUser
                        const tagsUpdated = tagsByUser.map(cur => cur._id === updatedTag._id ? updatedTag : cur)
                        cache.writeQuery({
                            query: QUERY_GET_TAGS_BY_USER,
                            data: { getTagsByUser: tagsUpdated }
                        })
                        setIsEditting(false)
                    }
                }
            })

    const handelUpdateTag = () => {
        try {
            updateTag()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={'tag-item'}>
            {errorUpdateTag && <h1>Error udpate tag</h1>}
            {loadingUpdateTag && <h1>Load udpate tag</h1>}
            <div className={'tag-item--body'}>
                {isEditting &&
                    <Input
                        value={value}
                        setValue={setValue}
                        state={stateTagInput}
                        setState={setStateTagInput}
                        pattern="^[a-zA-Z0-9\-]{2,18}$"
                        size="sm"
                    // events={{ onkeydown: () => props.onUpdateTag() }}
                    />
                }
                {!isEditting &&
                    <Title
                        content={value}
                        icon="hashtag"
                        iconSeparation="none"
                    />
                }
            </div>
            <div className="tag-item--footer">
                <div><Title content={formatDate(props.tag.creationDate)} size="xs" /></div>
                <div className="acctions">
                    {isEditting &&
                        <>
                            <Button
                                content=""
                                icon="check"
                                size="sm"
                                type="alpha"
                                onClick={() => handelUpdateTag()}
                            />
                            <Button
                                content=""
                                icon="times"
                                size="sm"
                                type="alpha"
                                onClick={() => setIsEditting(false)}
                            />
                        </>
                    }
                    {!isEditting &&
                        <>
                            <Button
                                content=""
                                icon="pen"
                                size="sm"
                                type="alpha"
                                onClick={() => setIsEditting(true)}
                            />
                            {/* <Button
                                content=""
                                icon="trash-alt"
                                size="sm"
                                type="alpha"
                            /> */}
                        </>
                    }
                    <div className="acctions">
                    </div>
                </div>
            </div>
        </div>
    );
};
