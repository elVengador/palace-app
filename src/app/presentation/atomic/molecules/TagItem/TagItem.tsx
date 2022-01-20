import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TagItem.scss';
import { Title } from '../../atoms/Title/Title';
import { Input, InputStatus } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';


interface TagItemProps {
    tagValue: string;
    date: string;
    startEditting?: boolean
    // onClick: () => void;
}

export const TagItem = ({
    tagValue = '',
    date = '00/00/00',
    startEditting = false
    // ...props
}: TagItemProps): JSX.Element => {

    // const onClickNote = () => props.onClick()
    const [value, setValue] = useState(tagValue)
    const [isEditting, setIsEditting] = useState(startEditting)
    const [stateTagInput, setStateTagInput] = useState<InputStatus>('success')

    return (
        <div className={'tag-item'}>
            <div className={'tag-item--body'}>
                {isEditting &&
                    <Input
                        value={value}
                        setValue={setValue}
                        state={stateTagInput}
                        setState={setStateTagInput}
                        pattern="^[a-zA-Z0-9\-]{2,18}$"
                        size="sm"
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
                <div><Title content={date} size="xs" /></div>
                <div className="acctions">
                    {isEditting &&
                        <>
                            <Button
                                content=""
                                icon="check"
                                size="sm"
                                type="alpha"
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
                            {/* <Button content="" icon="check" /> */}
                            <Button
                                content=""
                                icon="trash-alt"
                                size="sm"
                                type="alpha"
                            />
                        </>
                    }
                    <div className="acctions">
                    </div>
                </div>
            </div>
        </div>
    );
};
