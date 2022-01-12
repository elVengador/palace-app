import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormPassword } from './FormPassword';

export default {
    title: 'Desing System/Molecules/FormPassword',
    component: FormPassword,
} as ComponentMeta<typeof FormPassword>;

const Template: ComponentStory<typeof FormPassword> = (args) => <FormPassword {...args} />;

export const Default = Template.bind({});
Default.args = {

};
