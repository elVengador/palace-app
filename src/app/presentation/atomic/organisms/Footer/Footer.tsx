import React from 'react';

import './Footer.scss';
import { Title } from '../../atoms/Title/Title';

interface FooterProps {
    title: string;
}

export const Footer = ({
    title = '',
}: FooterProps): JSX.Element => {

    return (
        <footer className="footer">
            <div className="footer--items">
                <Title content={title} size="xs" color="secondary"></Title>
            </div>
        </footer>
    );
};
