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
    tagValue: 'This is a example note',
    date: '12 de noviembre del 2021'
};
