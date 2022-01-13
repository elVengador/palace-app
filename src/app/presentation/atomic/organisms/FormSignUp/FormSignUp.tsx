import React, { useState } from 'react';

import './FormSignUp.scss';
import { Form } from '../../molecules/Form/Form';
import { Input } from '../../atoms/Input/Input';
import { FormPassword } from '../../molecules/FormPassword/FormPassword';

interface FormProps {
    title?: string;
}

export const FormSignUp = ({
    title = 'Sign Up',
}: FormProps): JSX.Element => {

    const [nick, setNick] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Form title={title}>
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
