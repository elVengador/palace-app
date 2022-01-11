import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Title } from './Title';

export default {
    title: 'Desing System/Atoms/Title',
    component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
    size: 'md',
    content: 'Default Label'
};

export const SmallLabel = Template.bind({});
SmallLabel.args = {
    size: 'xs',
    content: 'Small Label'
};

export const LargeLabel = Template.bind({});
LargeLabel.args = {
    size: 'lg',
    content: 'Large Label',
    icon: 'home'
};
