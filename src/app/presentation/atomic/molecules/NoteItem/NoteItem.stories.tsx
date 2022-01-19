import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NoteItem } from './NoteItem';

export default {
    title: 'Desing System/Atoms/Note',
    component: NoteItem,
} as ComponentMeta<typeof NoteItem>;

const Template: ComponentStory<typeof NoteItem> = (args) => <NoteItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    content: 'This is a example note',
    tags: [{ id: '1', value: 'tasks asdf asdf asd zzz' }, { id: '2', value: 'examples' }, { id: '3', value: 'some tags' }],
    date: '12 de noviembre del 2021'
};
