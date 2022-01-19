import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './Button.scss';

interface ButtonProps {
    size?: 'sm' | 'md' | 'lg';
    icon?: IconProp | null;
    content: string;
    type?: 'normal' | 'alpha';
    state?: 'enable' | 'disable';
    onClick?: () => void;
}

export const Button = ({
    size = 'md',
    content = '...',
    icon = null,
    type = 'normal',
    state = 'enable',
    ...props
}: ButtonProps): JSX.Element => {
    return (
        <button type="button" className={`btn btn-${state} btn-${size} btn-${type} text-${size}`} {...props}>
            {icon && <FontAwesomeIcon icon={icon} className={content ? "mr-sm" : ""} />}
            {content}
        </button>
    );
};
