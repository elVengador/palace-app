import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
    title: 'Design System/Atoms/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        backgroundColor: {
            values: [
                { name: 'red', value: '#f00' },
                { name: 'green', value: '#0f0' },
                { name: 'blue', value: '#00f' },
            ],
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    label: 'Button',
};

export const Tmp = Template.bind({})
Tmp.args = {
    size: 'small',
    label: 'Tmp',
}
Tmp.parameters = {
    backgroundColor: {
        values: [
            { name: 'red', value: '#f00' },
            { name: 'green', value: '#0f0' },
            { name: 'blue', value: '#00f' },
        ],
    },
};
