import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NoteForm } from './NoteForm';

export default {
    title: 'Desing System/Organisims/TagForm',
    component: NoteForm,
} as ComponentMeta<typeof NoteForm>;

const Template: ComponentStory<typeof NoteForm> = (args) => <NoteForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
