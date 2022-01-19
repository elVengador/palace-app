import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tags } from './Tags';

export default {
    title: 'Desing System/Organisims/Tags',
    component: Tags,
} as ComponentMeta<typeof Tags>;

const Template: ComponentStory<typeof Tags> = () => <Tags />;

export const Default = Template.bind({});
Default.args = {
    title: 'Titulo del Formulario'
};
