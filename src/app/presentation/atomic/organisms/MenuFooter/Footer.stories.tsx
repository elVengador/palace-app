import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MenuFooter } from './MenuFooter';

export default {
    title: 'Desing System/Organisims/Footer2',
    component: MenuFooter,
} as ComponentMeta<typeof MenuFooter>;

const Template: ComponentStory<typeof MenuFooter> = (args) => <MenuFooter {...args} />;

export const Default = Template.bind({});
Default.args = {
    // elementOptions: <div>This is the footer</div>
};
