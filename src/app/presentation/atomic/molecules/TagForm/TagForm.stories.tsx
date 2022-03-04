import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TagForm } from './TagForm';

export default {
    title: 'Desing System/Molecules/TagForm',
    component: TagForm,
} as ComponentMeta<typeof TagForm>;

const Template: ComponentStory<typeof TagForm> = (args) => <TagForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

// export const FillTagForm = Template.bind({});
// FillTagForm.args = {};
