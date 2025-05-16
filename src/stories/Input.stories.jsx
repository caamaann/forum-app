import Input from '../components/common/Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    required: { control: 'boolean' },
    onChange: { action: 'changed' },
    className: { control: 'text' },
  },
};

// Template for stories
function Template(args) {
  return <Input {...args} />;
}

// Default input
export const Default = Template.bind({});
Default.args = {
  id: 'input-default',
  label: 'Label',
  placeholder: 'Placeholder text',
  type: 'text',
  required: false,
};

// Text input
export const TextInput = Template.bind({});
TextInput.args = {
  id: 'input-text',
  label: 'Text Input',
  placeholder: 'Enter your text here',
  type: 'text',
};

// Email input
export const EmailInput = Template.bind({});
EmailInput.args = {
  id: 'input-email',
  label: 'Email',
  placeholder: 'example@email.com',
  type: 'email',
};

// Password input
export const PasswordInput = Template.bind({});
PasswordInput.args = {
  id: 'input-password',
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
};

// Required input
export const RequiredInput = Template.bind({});
RequiredInput.args = {
  id: 'input-required',
  label: 'Required Field',
  placeholder: 'This field is required',
  type: 'text',
  required: true,
};

// Without label
export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  id: 'input-no-label',
  placeholder: 'Input without label',
  type: 'text',
};

// With custom class
export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  id: 'input-custom',
  label: 'Custom Styled Input',
  placeholder: 'Custom styling',
  type: 'text',
  className: 'border-blue-500 bg-blue-50',
};
