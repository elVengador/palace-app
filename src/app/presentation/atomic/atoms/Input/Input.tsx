import React, { ChangeEvent, useEffect, useState } from 'react';
import { Style } from '../../../utils/interfaces.utils';

import './Input.scss';

export type InputStatus = 'default' | 'success' | 'error' | 'disable'

interface InputProps {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    state: InputStatus
    setState: React.Dispatch<React.SetStateAction<InputStatus>>
    labelValue?: string
    size?: 'sm' | 'md' | 'lg';
    required?: boolean
    pattern?: string,
    type?: 'text' | 'date' | 'password';
    attributes?: {
        id?: string;
        name?: string;
        placeholder?: string;
        style?: Style;
        className?: string
    }
    events?: {
        onClick?: () => void,
        onkeydown?: () => void
    }
}

export const Input = ({
    value = '',
    state = 'default',
    labelValue = '',
    size = 'md',
    required = true,
    pattern = '',
    type = 'text',
    ...props
}: InputProps): JSX.Element => {
    const [isTouched, setIsTouched] = useState(false)

    useEffect(() => {
        if (isDefaultValue() || !pattern) { return props.setState('default') }
        if (!isValid()) { return props.setState('error') }
        return props.setState('success')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const isValid = () => { return new RegExp(pattern).test(value) }

    const isDefaultValue = () => { return !value && !isTouched }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        props.setValue(e.target.value)
        if (isDefaultValue()) { return props.setState('default') }
        if (isValid()) { return props.setState('success') }
        return props.setState('error')
    }

    return (
        <div className="input">
            {labelValue && <div className={`input--label input--label-${size}`}>
                <label>{labelValue}</label>
                {required && <span> *</span>}
            </div>}
            {state !== 'disable' &&
                <input
                    value={value}
                    type={type}
                    className={`input--element input--element-${size} input--element-${state}`}
                    autoComplete={'off'}
                    onChange={(e) => onChangeInput(e)}
                    onFocus={() => setIsTouched(true)}
                    {...props.attributes}
                    {...props.events}
                >
                </input>
            }
            {state === 'disable' &&
                <div className={`input-disable input-${size}`}>{value}</div>}
        </div>
    );
};
