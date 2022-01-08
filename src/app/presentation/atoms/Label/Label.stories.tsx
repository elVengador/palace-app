import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Label } from './Label';
import { icon } from '@fortawesome/fontawesome-svg-core';

export default {
    title: 'Desing System/Atoms/Label',
    component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
    type: 'label',
    size: 'md',
    content: 'Default Label'
};

export const Tag = Template.bind({});
Tag.args = {
    type: 'tag',
    size: 'md',
    content: 'Tag Label'
};

export const LabelWithIcon = Template.bind({});
LabelWithIcon.args = {
    type: 'tag',
    size: 'md',
    content: 'Tag Label',
    icon: 'home'
};
