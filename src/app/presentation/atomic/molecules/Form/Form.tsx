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
        <div className="form">
            <div className="form-header">
                <Title content={title} size="lg"></Title>
            </div>
            <div className="form-body">
                {props.children}
            </div>
            <div className="form-footer">
                <Button content='ok' icon="check" />
            </div>
        </div>
    );
};
