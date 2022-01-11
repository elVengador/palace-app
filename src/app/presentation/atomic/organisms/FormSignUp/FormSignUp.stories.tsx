import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormSignUp } from './FormSignUp';

export default {
    title: 'Desing System/Organisims/FormSignUp',
    component: FormSignUp,
} as ComponentMeta<typeof FormSignUp>;

const Template: ComponentStory<typeof FormSignUp> = (args) => <FormSignUp {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Titulo del Formulario'
};
