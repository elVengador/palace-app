import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NoteItem } from './NoteItem';

export default {
    title: 'Desing System/Molecules/NoteItem',
    component: NoteItem,
} as ComponentMeta<typeof NoteItem>;

const Template: ComponentStory<typeof NoteItem> = (args) => <NoteItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    content: 'This is a example note',
    tags: [
        {
            _id: '1',
            value: 'tasks asdf asdf asd zzz',
            creationDate: '',
            updateDate: '',
            state: '',
            userId: ''
        },
        {
            _id: '2',
            value: 'examples',
            creationDate: '',
            updateDate: '',
            state: '',
            userId: ''
        },
        {
            _id: '3',
            value: 'some tags',
            creationDate: '',
            updateDate: '',
            state: '',
            userId: ''
        }],
    dateInISO: '2022-03-04T17:59:01.834Z'
};
