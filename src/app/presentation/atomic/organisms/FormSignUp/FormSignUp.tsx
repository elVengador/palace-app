import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import './FormSignUp.scss';
import { Form } from '../../molecules/Form/Form';
// import { signUp } from '../../../../application/controllers/auth.controller';
import { Input, InputStatus } from '../../atoms/Input/Input';
import { RE_EMAIL, RE_PASSWORD } from '../../../utils/regex.utils';
import { MUTATION_SIGN_UP } from '../../../../infraestructure/repository/auth/auth.gql';
import { SignUpInput } from '../../../../domain/entities';

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
    const [signIn, { error, data }] = useMutation<string, SignUpInput>(MUTATION_SIGN_UP, { variables: { nick, email, password } });

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

    const onSubmitSignUp = () => {
        try {
            if (isInvalidForm()) { return console.log('invalid form'); }
            signIn()
        } catch (err) {
            console.log('ERRor', err);
        }
    }

    { data && navigate("/auth") }
    { error && <h1>Hay un error</h1> }

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
                    pattern={RE_PASSWORD}
                    type="password"
                />
                <Input
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    state={confirmPasswordState}
                    setState={setConfirmPasswordState}
                    labelValue="Confirm your password"
                    type="password"
                    pattern={RE_PASSWORD} />
            </>
        </Form>
    );
};
