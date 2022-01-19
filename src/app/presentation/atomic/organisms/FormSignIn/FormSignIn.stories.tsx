import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormSignIn } from './FormSignIn';

export default {
    title: 'Desing System/Organisims/FormSignUp',
    component: FormSignIn,
} as ComponentMeta<typeof FormSignIn>;

const Template: ComponentStory<typeof FormSignIn> = (args) => <FormSignIn {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Titulo del Formulario'
};
