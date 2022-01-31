import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './FormSignIn.scss';
import * as storage from '../../../../../core/application/controllers/storage.controller';
import { Form } from '../../../../../core/presentation/atomic/molecules/Form/Form';
import { Input, InputStatus } from '../../../../../core/presentation/atomic/atoms/Input/Input';
import { RE_EMAIL, RE_PASSWORD } from '../../../../../core/presentation/utils/regex.utils';
import { MUTATION_SIGN_IN } from '../../../../../core/infraestructure/repository/auth/auth.gql';
import { SignInInput, TokensOutput } from '../../../../domain/entities';
import { useMutation } from '@apollo/client';

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
    const [signUp, { error, data }] = useMutation<{ signIn: TokensOutput }, SignInInput>
        (MUTATION_SIGN_IN, { variables: { email, password } });

    const successStatus: InputStatus = 'success'
    const navigate = useNavigate();

    useEffect(() => {
        if (!data?.signIn) { return }

        const saveTokens = ({ accessToken, refreshToken }: TokensOutput) => {
            if (!accessToken || !refreshToken) { return console.log('invalid response, try again'); }

            storage.saveSession({ key: 'access-token', value: accessToken })
            storage.saveSession({ key: 'refresh-token', value: refreshToken })
        }
        saveTokens(data.signIn)
        navigate("/notes")
    }, [data, navigate])

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

            signUp()
        } catch (err) {
            console.log('USER/PASS invalids');
        }
    }

    { data?.signIn && console.log('data:', data.signIn); }

    return (
        <Form title={title} onSubmit={onSubmitSignIn}>
            <>
                {error && <h1>Hay un error</h1>}
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
