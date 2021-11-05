import React from 'react';
import './button.css';

const COLORS = {
    red: '#f00',
    green: '#0f0',
    blue: '#00f',
}

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: 'red' | 'green' | 'blue';
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
    primary = false,
    size = 'medium',
    backgroundColor = 'blue',
    label,
    ...props
}: ButtonProps) => {
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
    return (
        <button
            type="button"
            className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
            style={{ backgroundColor: COLORS[backgroundColor] }}
            {...props}
        >
            {label}
        </button>
    );
};
