import React from 'react';

import './Header.scss';
import { Title } from '../../atoms/Title/Title';

interface HeaderProps {
    title: string;
}

export const Header = ({
    title = ''
}: HeaderProps): JSX.Element => {

    return (
        <header className="header">
            <div className="header--items">
                <Title content={title} color="secondary"></Title>
            </div>
        </header>
    );
};
