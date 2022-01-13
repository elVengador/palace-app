import React, { ChangeEvent, useEffect, useState } from 'react';

import './Input.scss';

export type InputStatus = 'default' | 'success' | 'error' | 'disable'

interface InputProps {
    size?: 'sm' | 'md' | 'lg';
    label?: string
    placeholder?: string;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>
    required?: boolean
    type?: 'text' | 'date' | 'password';
    state?: InputStatus
    pattern?: string
    onClick?: () => void;
}

export const Input = ({
    size = 'md',
    label = '',
    placeholder = '...',
    content = '',
    required = true,
    type = 'text',
    state = 'default',
    pattern = '',
    ...props
}: InputProps): JSX.Element => {
    const [value, setValue] = useState(content)
    const [status, setStatus] = useState<InputStatus>('default')
    const [isTouched, setIsTouched] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { init() }, [])

    useEffect(() => {
        console.log('useEffect content');
        setValue(content)
        if (isDefaultValue() || !pattern) { return setStatus('default') }
        if (!isValid()) { return setStatus('error') }
        return setStatus('success')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content])

    useEffect(() => {
        setStatus(state)
    }, [state])

    const init = () => { setStatus(state) }

    const isValid = () => { return new RegExp(pattern).test(content) }

    const isDefaultValue = () => { return !content && !isTouched }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('onChange');
        setValue(e.target.value)
        props.setContent(e.target.value)
    }

    return (
        <div>
            <div className={`label-input label-input-${size}`}>
                <label>{label}</label>
                {required && <span>*</span>}
            </div>
            {status !== 'disable' &&
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`input input-${size} input-${status}`}
                    autoComplete={'off'}
                    value={value}
                    onChange={(e) => onChangeInput(e)}
                    onFocus={() => setIsTouched(true)}
                >
                </input>
            }
            {status === 'disable' &&
                <div className={`input-disable input-${size}`}>{content}</div>}
        </div>
    );
};
