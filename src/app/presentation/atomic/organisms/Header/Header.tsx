import React, { useState } from 'react';

import './Header.scss';
import { Form } from '../../molecules/Form/Form';
import { Input } from '../../atoms/Input/Input';
import { FormPassword } from '../../molecules/FormPassword/FormPassword';
import { Title } from '../../atoms/Title/Title';

interface HeaderProps {
    title: string;
    onClick?: () => void;
    children: JSX.Element
}

export const Header = ({
    title = '',
    ...props
}: HeaderProps): JSX.Element => {

    const [nick, setNick] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <header title='Sign Up' >
            <Title content="Mind Notes"></Title>
        </header>
    );
};
