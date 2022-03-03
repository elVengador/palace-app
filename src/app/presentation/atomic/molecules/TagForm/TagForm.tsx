import React, { useContext, useState } from 'react';

import './TagForm.scss';
import { Input } from '../../../../../core/presentation/atomic/atoms/Input/Input';
import { useMutation } from '@apollo/client';
import { MUTATION_ADD_TAG, QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';
import { AddTagInput, Tag } from '../../../../domain/entities';
import { InputStatus } from '../../../../../core/presentation/utils/interfaces.utils';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { AlertContext } from '../../../../../App';

interface TagFormProps {
    handleBeforeSubmit: () => void,
    destroyTagForm: () => void,
}

export const TagForm = ({
    ...props
}: TagFormProps): JSX.Element => {
    const alertContext = useContext(AlertContext)
    const [value, setValue] = useState('')
    const [stateTagInput, setStateTagInput] = useState<InputStatus>('success')
    const [addTag, { loading: loadingAddTag }] = useMutation<{ addTag: Tag }, AddTagInput>
        (MUTATION_ADD_TAG, {
            variables: { value },
            update(cache, { data }) {
                const newTag = data?.addTag
                const existtingTags = cache.readQuery<{ getTagsByUser: Tag[] }>({ query: QUERY_GET_TAGS_BY_USER })
                if (existtingTags && newTag) {
                    const tagsByUser = existtingTags?.getTagsByUser
                    const getTagsByUser = [...tagsByUser, newTag]
                    cache.writeQuery({
                        query: QUERY_GET_TAGS_BY_USER,
                        data: { getTagsByUser: getTagsByUser }
                    })
                    setValue('')
                    props.handleBeforeSubmit()
                }
            },
            onError: (err) => {
                console.log(err);
                //manage error
                // if unauthorized ==> redirect to sing in
                alertContext?.addErrorAlert()
            }
        })

    const onSubmit = () => {
        try {
            if (stateTagInput !== 'success') {
                return alertContext?.addErrorAlert('Invalid tag')
            }

            addTag()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="tag-form">
            <IconButton
                attributes={{ title: 'Close tag form' }}
                icon='times'
                color='fg'
                events={{ onClick: () => props.destroyTagForm() }}
            />
            <Input
                value={value}
                setValue={setValue}
                state={stateTagInput}
                setState={setStateTagInput}
                pattern="^[a-zA-Z0-9\-]{2,18}$"
                size="md"
                attributes={{ id: '', placeholder: 'Write name from new tag' }}
            />
            {!loadingAddTag && <IconButton
                attributes={{ title: 'Add Tag' }}
                icon='check'
                color='fg'
                events={{ onClick: () => onSubmit() }}
            />}
            {loadingAddTag && <Title
                iconSeparation='none'
                color='fg'
                content=''
                icon={'spinner'}
            />}
        </div>
    );
};
