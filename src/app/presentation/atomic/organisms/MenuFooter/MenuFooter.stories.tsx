import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MenuFooter } from './MenuFooter';

export default {
    title: 'Desing System/Organisims/MenuFooter',
    component: MenuFooter,
} as ComponentMeta<typeof MenuFooter>;

const Template: ComponentStory<typeof MenuFooter> = (args) => <MenuFooter {...args} />;

export const Default = Template.bind({});
Default.args = {
    menuItems: [
        {
            icon: 'home',
            path: '/home',
            title: 'Home'
        },
        {
            icon: 'user',
            path: '/user',
            title: 'User'
        },
        {
            icon: 'sticky-note',
            path: '/note',
            title: 'Notes'
        },
    ]
};
