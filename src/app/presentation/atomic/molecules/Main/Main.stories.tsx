import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Main } from './Main';

export default {
    title: 'Desing System/Molecules/Main',
    component: Main,
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = (args) => <Main {...args} />;

export const Default = Template.bind({});
Default.args = {
    // title: 'Titulo del Formulario'
};
