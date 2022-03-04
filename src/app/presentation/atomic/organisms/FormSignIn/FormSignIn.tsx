import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './FormSignIn.scss';
import * as storage from '../../../../../core/application/controllers/storage.controller';
import { Form } from '../../../../../core/presentation/atomic/molecules/Form/Form';
import { Input } from '../../../../../core/presentation/atomic/atoms/Input/Input';
import { RE_EMAIL, RE_PASSWORD } from '../../../../../core/presentation/utils/regex.utils';
import { MUTATION_SIGN_IN } from '../../../../../core/infraestructure/repository/auth/auth.gql';
import { SignInInput, TokensOutput } from '../../../../domain/entities';
import { useMutation } from '@apollo/client';
import { InputStatus } from '../../../../../core/presentation/utils/interfaces.utils';
import { useInput } from '../../../../../core/presentation/utils/hooks/useInput';
import { AlertContext } from '../../../../../App';

interface FormProps {
    title?: string;
}

export const FormSignIn = ({
    title = 'Sign In',
}: FormProps): JSX.Element => {
    const alertContext = useContext(AlertContext)
    const [email, setEmail, emailState, setEmailState] = useInput()
    const [password, setPassword, passwordState, setPasswordState] = useInput()
    const [signUp, { loading }] = useMutation<{ signIn: TokensOutput }, SignInInput>
        (MUTATION_SIGN_IN, { variables: { email, password } });

    const successStatus: InputStatus = 'success'
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!data?.signIn) { return }


    //     saveTokens(data.signIn)
    //     navigate("/notes")
    // }, [data, navigate])

    const saveTokens = ({ accessToken, refreshToken }: TokensOutput) => {
        if (!accessToken || !refreshToken) { return console.log('invalid response, try again'); }

        storage.saveSession({ key: 'access-token', value: accessToken })
        storage.saveSession({ key: 'refresh-token', value: refreshToken })
    }

    const isInvalidForm = () => {
        const invalidInputs = [
            emailState,
            passwordState,
        ].filter(cur => cur !== successStatus)
        return invalidInputs.length
    }

    const onSubmitSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            console.log('on submit sign in');
            if (isInvalidForm()) { return alertContext?.addErrorAlert('Invalid inputs') }

            signUp({
                onCompleted: (data) => {
                    saveTokens(data.signIn)
                    navigate("/notes")
                },
                onError: (err) => {
                    if (err.message === 'Field invalid') {
                        return alertContext?.addErrorAlert('User and/or password invalids')
                    }
                    alertContext?.addErrorAlert()
                }
            })
        } catch (err) {
            console.log('>>', err);
            alertContext?.addErrorAlert()
        }
    }

    return (
        <Form title={title} onSubmit={onSubmitSignIn} loading={loading}>
            <>
                <Input
                    value={email}
                    setValue={setEmail}
                    state={emailState}
                    setState={setEmailState}
                    labelValue="Email"
                    pattern={RE_EMAIL}
                    attributes={{ id: 'email-input' }}
                />
                <Input
                    value={password}
                    setValue={setPassword}
                    state={passwordState}
                    setState={setPasswordState}
                    labelValue="Password"
                    pattern={RE_PASSWORD}
                    type="password"
                    attributes={{ id: 'password-input' }}
                />
            </>
        </Form>
    );
};
