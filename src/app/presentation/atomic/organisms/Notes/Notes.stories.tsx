import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Notes } from './Notes';

export default {
    title: 'Desing System/Organisims/Notes',
    component: Notes,
} as ComponentMeta<typeof Notes>;

const Template: ComponentStory<typeof Notes> = (args) => <Notes {...args} />;

export const Default = Template.bind({});
Default.args = {
    // title: 'Titulo del Formulario'
};
