import Textarea from '../components/common/Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    rows: { control: 'number' },
    required: { control: 'boolean' },
    onChange: { action: 'changed' },
    className: { control: 'text' },
  },
};

// Template for stories
function Template(args) {
  return <Textarea {...args} />;
}

// Default textarea
export const Default = Template.bind({});
Default.args = {
  id: 'textarea-default',
  label: 'Label',
  placeholder: 'Placeholder text',
  rows: 8,
  required: false,
};

// Textarea with many rows
export const ManyRows = Template.bind({});
ManyRows.args = {
  id: 'textarea-many-rows',
  label: 'Long Content',
  placeholder: 'Type a long message here...',
  rows: 12,
};

// Textarea with few rows
export const FewRows = Template.bind({});
FewRows.args = {
  id: 'textarea-few-rows',
  label: 'Short Comment',
  placeholder: 'Type a brief comment here...',
  rows: 3,
};

// Required textarea
export const RequiredTextarea = Template.bind({});
RequiredTextarea.args = {
  id: 'textarea-required',
  label: 'Required Content',
  placeholder: 'This field is required',
  rows: 6,
  required: true,
};

// Without label
export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  id: 'textarea-no-label',
  placeholder: 'Textarea without label',
  rows: 5,
};

// With custom class
export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  id: 'textarea-custom',
  label: 'Custom Styled Textarea',
  placeholder: 'Custom styling',
  rows: 4,
  className: 'border-green-500 bg-green-50',
};

// Filled textarea
export const FilledTextarea = Template.bind({});
FilledTextarea.args = {
  id: 'textarea-filled',
  label: 'Filled Content',
  placeholder: 'Type here...',
  value:
    'This textarea is pre-filled with some content that demonstrates how it looks with text already in it. The user can edit or replace this text as needed.',
  rows: 6,
};
