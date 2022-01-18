import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './FormSignUp.scss';
import { Form } from '../../molecules/Form/Form';
import { Input } from '../../atoms/Input/Input';
import { FormPassword } from '../../molecules/FormPassword/FormPassword';
import { signUp } from '../../../../application/controllers/auth.controller';
import { Input2, InputStatus } from '../../atoms/Input2/Input';

interface FormProps {
    title?: string;
}

export const FormSignUp = ({
    title = 'Sign Up',
}: FormProps): JSX.Element => {

    const [tt, setTt] = useState('')
    const [ttState, setTtState] = useState<InputStatus>('default')

    const [nick, setNick] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [tt, setTT] = useState<TtProps>('')

    const navigate = useNavigate();

    const onSubmitSignUp = async () => {
        const res = await signUp({ nick, email, password })
        if (res) { navigate("/auth") }
    }

    return (
        <Form title={title}>
            <>
                <p>{ttState}</p>
                <Input2
                    value={tt}
                    setValue={setTt}
                    state={ttState}
                    setState={setTtState}
                    labelValue="Some value here"
                    pattern="^.{2,18}$" />
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
                <button onClick={() => onSubmitSignUp()}>ok</button>
            </>
        </Form>
    );
};
