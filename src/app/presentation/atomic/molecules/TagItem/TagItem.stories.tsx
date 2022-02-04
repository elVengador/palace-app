import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TagItem } from './TagItem';

export default {
    title: 'Desing System/Molecules/TagItem',
    component: TagItem,
} as ComponentMeta<typeof TagItem>;

const Template: ComponentStory<typeof TagItem> = (args) => <TagItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    tag: {
        _id: '',
        userId: '',
        value: 'This is a example note',
        state: '',
        creationDate: '12 de noviembre del 2021',
        updateDate: '12 de noviembre del 2021'
    }
};
