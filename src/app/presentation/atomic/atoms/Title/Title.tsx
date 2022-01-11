import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './Title.scss';

interface TitleProps {
    size?: 'xs' | 'md' | 'lg';
    icon?: IconProp | null;
    content: string;
    onClick?: () => void;
}

export const Title = ({
    size = 'md',
    content = '...',
    icon = null,
    ...props
}: TitleProps): JSX.Element => {
    return (
        <>
            {
                size === 'xs' &&
                <span className={`title title-${size}`} {...props}>
                    {icon && <FontAwesomeIcon icon={icon} className="mr-sm" />}
                    {content}
                </span>
            }
            {
                size === 'md' &&
                <h4 className={`title title-${size}`} {...props}>
                    {icon && <FontAwesomeIcon icon={icon} className="mr-sm" />}
                    {content}
                </h4>
            }
            {
                size === 'lg' &&
                <h1 className={`title title-${size}`} {...props}>
                    {icon && <FontAwesomeIcon icon={icon} className="mr-sm" />}
                    {content}
                </h1>
            }
        </>
    );
};
