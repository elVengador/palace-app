import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Form } from './Form';

export default {
    title: 'Desing System/Molecules/Form',
    component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Titulo del Formulario'
};
