import React, { useState } from 'react';

import './TagForm.scss';
import { Input, InputStatus } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';


interface TagFormProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
    handleAddTag: () => void;
}

export const TagForm = ({
    value = '',
    ...props
}: TagFormProps): JSX.Element => {

    const [stateTagInput, setStateTagInput] = useState<InputStatus>('success')

    const onSubmit = () => {
        try {
            if (stateTagInput !== 'success') { return console.log('form invalid'); }

            console.log('submit tag');
            props.handleAddTag()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="tag-form">
            <Input
                value={value}
                setValue={props.setValue}
                state={stateTagInput}
                setState={setStateTagInput}
                pattern="^[a-zA-Z0-9\-]{2,18}$"
                size="sm"
                attributes={{ placeholder: 'Write name from new tag' }}
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
