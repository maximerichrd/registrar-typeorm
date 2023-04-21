import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

const ButtonComponentMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
};
export default ButtonComponentMeta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button text',
};
