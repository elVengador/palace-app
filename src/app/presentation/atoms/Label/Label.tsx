import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './Label.scss';

interface LabelProps {
    type?: 'label' | 'tag'
    size?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';
    icon?: IconProp | null;
    content: string;
    onClick?: () => void;
}

export const Label = ({
    type = 'label',
    size = 'md',
    content = '...',
    icon = null,
    ...props
}: LabelProps): JSX.Element => {
    return (
        <label className={`color-main text-${size}`} {...props}>
            {type === 'tag' && <span>#</span>}
            {icon && <FontAwesomeIcon icon={icon} className="mr-sm" />}
            {content}
        </label>
    );
};
