import React, { useState } from 'react';

import './Footer.scss';
import { Form } from '../../molecules/Form/Form';
import { Input } from '../../atoms/Input/Input';
import { FormPassword } from '../../molecules/FormPassword/FormPassword';

interface FormProps {
    title: string;
    onClick?: () => void;
    children: JSX.Element
}

export const FormSignUp = ({
    title = '',
    ...props
}: FormProps): JSX.Element => {

    const [nick, setNick] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <Form title='Sign Up' >
            <>
                <Input
                    label="Nick"
                    content={nick}
                    setContent={setNick}
                    placeholder="Write your nick"
                    pattern="^.{2,18}$"
                />
                <Input
                    label="Email"
                    content={email}
                    setContent={setEmail}
                    placeholder="Write your email"
                    pattern="^.{2,18}$"
                />
                <FormPassword passwordValue={password} setContent={setPassword} />
            </>
        </Form>
    );
};
