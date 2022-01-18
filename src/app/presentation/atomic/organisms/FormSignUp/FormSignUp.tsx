import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './FormSignUp.scss';
import { Form } from '../../molecules/Form/Form';
import { signUp } from '../../../../application/controllers/auth.controller';
import { Input, InputStatus } from '../../atoms/Input/Input';
import { RE_EMAIL, RE_PASSWORD } from '../../../utils/regex.utils';

interface FormProps {
    title?: string;
}

export const FormSignUp = ({
    title = 'Sign Up',
}: FormProps): JSX.Element => {

    const [nick, setNick] = useState('')
    const [nickState, setNickState] = useState<InputStatus>('default')
    const [email, setEmail] = useState('')
    const [emailState, setEmailState] = useState<InputStatus>('default')
    const [password, setPassword] = useState('')
    const [passwordState, setPasswordState] = useState<InputStatus>('default')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordState, setConfirmPasswordState] = useState<InputStatus>('default')

    const successStatus: InputStatus = 'success'
    const navigate = useNavigate();

    useEffect(() => {
        if (!password || !confirmPassword) { return setConfirmPasswordState('default') }
        if (password && password === confirmPassword) { return setConfirmPasswordState('success') }
        setConfirmPasswordState('error')
    }, [password, confirmPassword])

    const isInvalidForm = () => {
        const invalidInputs = [
            nickState,
            emailState,
            passwordState,
            confirmPasswordState
        ].filter(cur => cur !== successStatus)
        return invalidInputs.length
    }

    const onSubmitSignUp = async () => {
        if (isInvalidForm()) { return console.log('Error'); }

        const res = await signUp({ nick, email, password })
        if (res) { navigate("/auth") }
    }

    return (
        <Form title={title} onSubmit={onSubmitSignUp}>
            <>
                <Input
                    value={nick}
                    setValue={setNick}
                    state={nickState}
                    setState={setNickState}
                    labelValue="Nick"
                    pattern="^.{2,18}$" />
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
                    pattern={RE_PASSWORD} />
                <Input
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    state={confirmPasswordState}
                    setState={setConfirmPasswordState}
                    labelValue="Confirm your password"
                    pattern={RE_PASSWORD} />
            </>
        </Form>
    );
};
