import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Page } from './Page';

export default {
    title: 'Desing System/Templates/PageForm',
    component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Default = Template.bind({});
Default.args = {
    header: <div>header</div>,
    footer: <div>Footer</div>,
    main: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quis fugit temporibus ut quae nihil nisi possimus voluptas! Vero possimus reprehenderit provident illo nemo eaque? Nemo fuga harum repellendus obcaecati?</div>,
    leftMenu: <div>LM</div>,
    rightMenu: <div>RM</div>,
};
