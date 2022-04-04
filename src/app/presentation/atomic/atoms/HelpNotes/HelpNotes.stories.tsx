import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { HelpNotes } from './HelpNotes';

export default {
    title: 'Desing System/Atoms/HelpNotes',
    component: HelpNotes,
} as ComponentMeta<typeof HelpNotes>;

const Template: ComponentStory<typeof HelpNotes> = (args) => <HelpNotes />;

export const Default = Template.bind({});
Default.args = {
    // content: ['ho', '# title     Title',]
};
