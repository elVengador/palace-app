import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './Button.scss';

interface ButtonProps {
    size?: 'sm' | 'md' | 'lg';
    icon?: IconProp | null;
    content: string;
    type?: 'enable' | 'disable';
    onClick?: () => void;
}

export const Button = ({
    size = 'md',
    content = '...',
    icon = null,
    type = 'enable',
    ...props
}: ButtonProps): JSX.Element => {
    return (
        <button type="button" className={`btn btn-${type} btn-${size} text-${size}`} {...props}>
            {icon && <FontAwesomeIcon icon={icon} className="mr-sm" />}
            {content}
        </button>
    );
};
