import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './Form.scss';
import { Title } from '../../atoms/Title/Title';
import { Button } from '../../atoms/Button/Button';

interface FormProps {
    title: string;
    onClick?: () => void;
    children: JSX.Element
}

export const Form = ({
    title = '',
    ...props
}: FormProps): JSX.Element => {
    return (
        <>
            <Title content={title}></Title>
            {props.children}
            <Button content='ok' icon="check" />
        </>
    );
};
