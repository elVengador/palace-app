import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotesOperations } from './NoteOperations';

export default {
    title: 'Desing System/Organisims/NoteOperations',
    component: NotesOperations,
} as ComponentMeta<typeof NotesOperations>;

const Template: ComponentStory<typeof NotesOperations> = (args) => <NotesOperations {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Titulo del Formulario'
};
