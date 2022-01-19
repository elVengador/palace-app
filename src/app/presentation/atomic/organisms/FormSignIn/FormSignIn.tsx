import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './FormSignIn.scss';
import * as storage from '../../../../application/controllers/storage.controller';
import { Form } from '../../molecules/Form/Form';
import { signIn } from '../../../../application/controllers/auth.controller';
import { Input, InputStatus } from '../../atoms/Input/Input';
import { RE_EMAIL, RE_PASSWORD } from '../../../utils/regex.utils';

interface FormProps {
    title?: string;
}

export const FormSignIn = ({
    title = 'Sign In',
}: FormProps): JSX.Element => {

    const [email, setEmail] = useState('')
    const [emailState, setEmailState] = useState<InputStatus>('default')
    const [password, setPassword] = useState('')
    const [passwordState, setPasswordState] = useState<InputStatus>('default')

    const successStatus: InputStatus = 'success'
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!password || !confirmPassword) { return setConfirmPasswordState('default') }
    //     if (password && password === confirmPassword) { return setConfirmPasswordState('success') }
    //     setConfirmPasswordState('error')
    // }, [password, confirmPassword])

    const isInvalidForm = () => {
        const invalidInputs = [
            emailState,
            passwordState,
        ].filter(cur => cur !== successStatus)
        return invalidInputs.length
    }

    const onSubmitSignIn = async () => {
        try {
            if (isInvalidForm()) { return console.log('Error'); }

            const { accessToken, refreshToken } = await signIn({ email, password })
            if (!accessToken || !refreshToken) { throw new Error('Operation Bad, try again please') }

            storage.saveSession({ key: 'access-token', value: accessToken })
            storage.saveSession({ key: 'refresh-token', value: refreshToken })

            navigate("/notes")
        } catch (err) {
            console.log('USER/PASS invalids');
        }
    }

    return (
        <Form title={title} onSubmit={onSubmitSignIn}>
            <>
                <Input
                    value={email}
                    setValue={setEmail}
                    state={emailState}
                    setState={setEmailState}
                    labelValue="Email"
                    pattern={RE_EMAIL} />
                <Input
                    value={password}
                    setValue={setPassword}
                    state={passwordState}
                    setState={setPasswordState}
                    labelValue="Password"
                    pattern={RE_PASSWORD}
                    type="password"
                />
            </>
        </Form>
    );
};
