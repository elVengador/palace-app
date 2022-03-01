import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';

import './MenuFooter.scss';

export interface MenuItem {
    icon: IconProp,
    title: string,
    path: string
}

interface MenuFooterProps {
    menuItems: MenuItem[]
}

export const MenuFooter = ({
    menuItems
}: MenuFooterProps): JSX.Element => {

    const buildMenuItems = () => {
        return menuItems.map((cur, idx) =>
            <NavLink
                to={cur.path}
                // style={({ isActive }) => ({ color: isActive ? "var(--main)" : "gray" })}
                key={idx}
            >
                <IconButton
                    icon={cur.icon}
                    attributes={{ title: cur.title }}
                />
            </NavLink>
        )
    }

    return (
        <footer className="menu-footer">
            <div className="menu-footer--items">
                {buildMenuItems()}
            </div>
        </footer>
    );
};
