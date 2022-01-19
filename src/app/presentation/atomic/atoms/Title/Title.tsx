import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './Title.scss';
import { Style } from '../../../utils/interfaces.utils';

type IconSeparation = 'none' | 'sm' | 'md'
interface TitleProps {
    size?: 'xs' | 'md' | 'lg';
    content: string;
    icon?: IconProp | null;
    iconSeparation?: IconSeparation;
    color?: 'primary' | 'secondary',
    attributes?: {
        style?: Style;
        className?: string
    }
    onClick?: () => void;
}

export const Title = ({
    size = 'md',
    content = '...',
    icon = null,
    iconSeparation = 'sm',
    color = 'primary',
    ...props
}: TitleProps): JSX.Element => {
    return (
        <>
            {
                size === 'xs' &&
                <span className={`title title-${size} title-${color}`} {...props.attributes}>
                    {icon && <FontAwesomeIcon icon={icon} className={`icon icon-separation-${iconSeparation}`} />}
                    {content}
                </span>
            }
            {
                size === 'md' &&
                <h4 className={`title title-${size} title-${color}`} {...props.attributes}>
                    {icon && <FontAwesomeIcon icon={icon} className={`icon icon-separation-${iconSeparation}`} />}
                    {content}
                </h4>
            }
            {
                size === 'lg' &&
                <h1 className={`title title-${size} title-${color}`} {...props.attributes}>
                    {icon && <FontAwesomeIcon icon={icon} className={`icon icon-separation-${iconSeparation}`} />}
                    {content}
                </h1>
            }
        </>
    );
};
