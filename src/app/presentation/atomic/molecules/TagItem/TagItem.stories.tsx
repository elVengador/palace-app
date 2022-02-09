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
        value: 'Tag-example-max-18-chars',
        state: '',
        creationDate: '2022-02-09T16:19:10.984Z',
        updateDate: '2022-02-09T16:19:10.984Z'
    }
};
