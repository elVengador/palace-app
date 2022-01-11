import React, { useEffect, useState } from 'react';

import './Input.scss';

interface InputProps {
    size?: 'sm' | 'md' | 'lg';
    label?: string
    placeholder: string;
    content: string;
    optional: boolean
    type?: 'text' | 'date' | 'password';
    state?: 'default' | 'success' | 'error' | 'disable'
    onClick?: () => void;
}

export const Input = ({
    size = 'md',
    label = '',
    placeholder = '...',
    content = '',
    optional = false,
    type = 'text',
    state = 'default',
    ...props
}: InputProps): JSX.Element => {
    const [value, setValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)

    useEffect(() => {
        console.log(1);
        setValue(content)
    }, [content])

    return (
        <div>
            <div className={`label-input label-input-${size}`}>
                <label>{label}</label>
                {optional && <span>*</span>}
                {isTouched && 'TT'}
            </div>
            {state !== 'disable' &&
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`input input-${size} input-${state}`}
                    autoComplete={'off'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={e => setIsTouched(true)}
                >
                </input>
            }
            {state === 'disable' &&
                <div className={`input-disable input-${size}`}>{content}</div>}
        </div>
    );
};
