import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tags } from './Tags';
import { Tag } from '../../../../domain/entities';

export default {
    title: 'Desing System/Organisims/Tags',
    component: Tags,
} as ComponentMeta<typeof Tags>;

const dateMocked = new Date().toISOString()
const tagsMocked: Tag[] = [
    {
        _id: '1',
        creationDate: dateMocked,
        state: '',
        updateDate: dateMocked,
        userId: 'u1',
        value: 'tag1-mocked',
    },
    {
        _id: '2',
        creationDate: dateMocked,
        state: '',
        updateDate: dateMocked,
        userId: 'u1',
        value: 'tag2-mocked',
    },
    {
        _id: '3',
        creationDate: dateMocked,
        state: '',
        updateDate: dateMocked,
        userId: 'u1',
        value: 'tag3-mocked',
    },
]
const Template: ComponentStory<typeof Tags> = () => <Tags tags={tagsMocked} loading={false} />;

export const Default = Template.bind({});
Default.args = {};
