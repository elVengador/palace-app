import React, { useEffect, useState } from 'react';

// import './Form.scss';
import { Input, InputStatus } from '../../atoms/Input/Input';

interface FormProps {
    passwordValue: string
    setContent: React.Dispatch<React.SetStateAction<string>>
}

export const FormPassword = ({
    passwordValue = '',
    ...props
}: FormProps): JSX.Element => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        setPassword(passwordValue)
    }, [passwordValue])

    const getStateFromConfirmPassword = (): InputStatus => {
        if (password && password === confirmPassword) { return 'success' }
        return 'default'
    }

    return (
        <>
            <Input
                label="Password"
                content={password}
                setContent={setPassword}
                placeholder="Write your password"
                type="password"
                pattern="^.{7,21}$"
            />
            <Input
                label="Confirm Password"
                content={confirmPassword}
                setContent={setConfirmPassword}
                placeholder="Confirm your password"
                type="password"
                state={getStateFromConfirmPassword()}
            />
        </>
    );
};
