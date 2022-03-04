import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotePreview } from './NotePreview';

export default {
    title: 'Desing System/Organisims/NotePreview',
    component: NotePreview,
} as ComponentMeta<typeof NotePreview>;

const Template: ComponentStory<typeof NotePreview> = (args) => <NotePreview {...args} />;

export const Default = Template.bind({});
Default.args = {
    content: 'This is a example note',
    // tags: [
    //     {
    //         _id: '1',
    //         value: 'tasks asdf asdf asd zzz',
    //         creationDate: '',
    //         updateDate: '',
    //         state: '',
    //         userId: ''
    //     },
    //     {
    //         _id: '2',
    //         value: 'examples',
    //         creationDate: '',
    //         updateDate: '',
    //         state: '',
    //         userId: ''
    //     },
    //     {
    //         _id: '3',
    //         value: 'some tags',
    //         creationDate: '',
    //         updateDate: '',
    //         state: '',
    //         userId: ''
    //     }],
    // date: '12 de noviembre del 2021'
};
