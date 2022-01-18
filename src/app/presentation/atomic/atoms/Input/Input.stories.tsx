import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './Input';

export default {
    title: 'Desing System/Atoms/Input',
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
    size: 'md',
    // placeholder: 'Default input',
    // label: 'Some Label'
};

export const WithPattern = Template.bind({});
WithPattern.args = {
    size: 'md',
    // placeholder: 'Default input',
    // label: 'Only 5 UpperCases',
    pattern: '^[A-Z]{5}$'
};
