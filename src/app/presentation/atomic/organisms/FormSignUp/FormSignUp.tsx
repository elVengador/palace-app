import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import './FormSignUp.scss';
import { Form } from '../../../../../core/presentation/atomic/molecules/Form/Form';
import { Input } from '../../../../../core/presentation/atomic/atoms/Input/Input';
import { RE_EMAIL, RE_PASSWORD } from '../../../../../core/presentation/utils/regex.utils';
import { useInput } from '../../../../../core/presentation/utils/hooks/useInput';
import { InputStatus } from '../../../../../core/presentation/utils/interfaces.utils';
import { AlertContext } from '../../../../../App';
import { MUTATION_SIGN_UP } from '../../../../../core/infraestructure/repository/auth/auth.gql';
import { SignUpInput } from '../../../../domain/entities';

interface FormProps {
    title?: string;
}

export const FormSignUp = ({
    title = 'Sign Up',
}: FormProps): JSX.Element => {

    const [nick, setNick, nickState, setNickState] = useInput()
    const [email, setEmail, emailState, setEmailState] = useInput()
    const [password, setPassword, passwordState, setPasswordState] = useInput()
    const [confirmPassword, setConfirmPassword, confirmPasswordState, setConfirmPasswordState] = useInput()

    const alertContext = useContext(AlertContext)

    const [signUp, { loading }] = useMutation<string, SignUpInput>(MUTATION_SIGN_UP, { variables: { nick, email, password } });

    const SUCCESS_STATUS: InputStatus = 'success'
    const navigate = useNavigate();

    useEffect(() => {
        if (!password || !confirmPassword) { return setConfirmPasswordState('default') }
        if (password && password === confirmPassword) { return setConfirmPasswordState('success') }
        setConfirmPasswordState('error')
    }, [password, confirmPassword, setConfirmPasswordState])

    const isInvalidForm = () => {
        const invalidInputs = [
            nickState,
            emailState,
            passwordState,
        ].filter(cur => cur !== SUCCESS_STATUS)
        return invalidInputs.length

    }

    const onSubmitSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            if (isInvalidForm()) { return alertContext?.addErrorAlert('Invalid Inputs') }
            signUp({
                onCompleted: () => navigate("/auth"),
                onError: () => alertContext?.addErrorAlert()
            })
        } catch (err) {
            console.log('>>', err);
            alertContext?.addErrorAlert()
        }
    }

    return (
        <Form title={title} onSubmit={onSubmitSignUp} loading={loading}>
            <>
                <Input
                    value={nick}
                    setValue={setNick}
                    state={nickState}
                    setState={setNickState}
                    labelValue="Nick"
                    pattern="^.{2,18}$"
                    attributes={{ id: 'nick-input' }}
                />
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
                <Input
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    state={confirmPasswordState}
                    setState={setConfirmPasswordState}
                    labelValue="Confirm your password"
                    type="password"
                    pattern={RE_PASSWORD}
                    attributes={{ id: 'confirm-password-input' }}
                />
            </>
        </Form>
    );
};
