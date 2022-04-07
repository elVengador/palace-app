import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';

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

    const { pathname } = useLocation();

    const linkStyle = (path: string) => ({
        width: '30px',
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: path === pathname ? 'var(--dark-disabled)' : 'none',
        borderTop: `solid 4px var(${path === pathname ? '--primary' : '--dark'})`,
    })

    const buildMenuItems = () => {
        return menuItems.map((cur, idx) =>
            <NavLink
                to={cur.path}
                // style={({ isActive }) => ({ color: isActive ? "var(--main)" : "gray" })}
                key={idx}
                style={linkStyle(cur.path)}
            >
                <Title
                    content=''
                    icon={cur.icon}
                    size="sm"
                    attributes={{
                        title: cur.title,
                    }}
                    iconSeparation="none"
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
