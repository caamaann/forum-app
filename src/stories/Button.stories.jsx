import Button from '../components/common/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success', 'outline'],
    },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    className: { control: 'text' },
  },
};

// Template for stories
function Template(args) {
  return <Button {...args} />;
}

// Default button
export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  type: 'button',
  variant: 'primary',
  disabled: false,
  fullWidth: false,
};

// Primary button
export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
};

// Secondary button
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary',
};

// Danger button
export const Danger = Template.bind({});
Danger.args = {
  children: 'Danger Button',
  variant: 'danger',
};

// Success button
export const Success = Template.bind({});
Success.args = {
  children: 'Success Button',
  variant: 'success',
};

// Outline button
export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline Button',
  variant: 'outline',
};

// Disabled button
export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Button',
  disabled: true,
};

// Full width button
export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'Full Width Button',
  fullWidth: true,
};

// Submit button
export const Submit = Template.bind({});
Submit.args = {
  children: 'Submit Form',
  type: 'submit',
  variant: 'primary',
};
