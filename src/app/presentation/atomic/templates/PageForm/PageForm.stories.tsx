import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormSignUp } from './PageForm';

export default {
    title: 'Desing System/Templates/PageForm',
    component: FormSignUp,
} as ComponentMeta<typeof FormSignUp>;

const Template: ComponentStory<typeof FormSignUp> = (args) => <FormSignUp {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Titulo del Formulario'
};
