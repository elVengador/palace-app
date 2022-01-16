import React, { useState } from 'react';

import { Input, InputStatus } from '../../atoms/Input/Input';

interface FormProps {
    passwordValue: string
    setContent: React.Dispatch<React.SetStateAction<string>>
}

export const FormPassword = ({
    passwordValue = '',
    ...props
}: FormProps): JSX.Element => {
    const [confirmPassword, setConfirmPassword] = useState('')

    const getStateFromConfirmPassword = (): InputStatus => {
        if (passwordValue && passwordValue === confirmPassword) { return 'success' }
        return 'default'
    }

    return (
        <>
            <Input
                label="Password"
                content={passwordValue}
                setContent={props.setContent}
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
