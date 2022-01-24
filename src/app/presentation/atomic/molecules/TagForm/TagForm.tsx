import React, { useState } from 'react';

import './TagForm.scss';
import { Input, InputStatus } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { useMutation } from '@apollo/client';
import { MUTATION_ADD_TAG, QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';
import { AddTagInput, Tag } from '../../../../domain/entities';

interface TagFormProps {
    // value: string;
    // setValue: React.Dispatch<React.SetStateAction<string>>
    // handleAddTag: () => void;
    handleBeforeSubmit: () => void
}

export const TagForm = ({
    ...props
}: TagFormProps): JSX.Element => {

    const [value, setValue] = useState('')
    const [stateTagInput, setStateTagInput] = useState<InputStatus>('success')
    const [addTag, { error: errorAddTag, loading: loadingAddTag }] = useMutation<{ addTag: Tag }, AddTagInput>
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
                    // setCanAddTag(false)
                    setValue('')
                    props.handleBeforeSubmit()
                }
            }
        })

    const onSubmit = () => {
        try {
            if (stateTagInput !== 'success') { return console.log('form invalid'); }

            // props.handleAddTag()
            addTag()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="tag-form">
            {errorAddTag && <h1>{errorAddTag.message}</h1>}
            {loadingAddTag && <h1>loading</h1>}
            <Input
                value={value}
                setValue={setValue}
                state={stateTagInput}
                setState={setStateTagInput}
                pattern="^[a-zA-Z0-9\-]{2,18}$"
                size="sm"
                attributes={{ placeholder: 'Write name from new tag' }}
            // events={{ onkeydown: () => onSubmit() }}
            />
            <Button
                content=""
                icon="check"
                size="sm"
                type="alpha"
                onClick={() => onSubmit()}
            />

        </div>
    );
};
