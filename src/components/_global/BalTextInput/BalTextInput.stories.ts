import BalTextInput from './BalTextInput.vue';
import { generateTemplate } from '../../../../.storybook/helpers/templates';

export default {
  component: BalTextInput,
  title: 'Components/inputs/BalTextInput',
  args: {
    darkMode: false,
    name: 'input1',
    label: 'An input',
    size: 'md',
    validateOn: 'blur',
    type: 'text'
  },
  argTypes: {
    size: {
      type: { name: 'string', default: 'md' },
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg']
      }
    },
    type: {
      type: { name: 'string', default: 'text' },
      control: {
        type: 'select',
        options: ['text', 'number', 'date']
      }
    },
    validateOn: {
      type: { name: 'string', default: 'blur' },
      control: {
        type: 'select',
        options: ['blur', 'input']
      }
    }
  }
};

type Props = {
  name: string;
  label: string;
  type: string;
  size: string;
};

const Template = (args: Props) => ({
  components: { BalTextInput },
  setup() {
    return { args };
  },
  template: generateTemplate(`
<BalTextInput v-model="args.modelValue" v-bind="args">
  <template v-if="args.prepend" v-slot:prepend>
  $
  </template>
  <template v-if="args.append" v-slot:append>
    BAL
  </template>
</BalTextInput>
`)
});

export const Default = Template.bind({});
// @ts-ignore
Default.args = { modelValue: 'A value' };

export const WithPrepend = Template.bind({});
// @ts-ignore
WithPrepend.args = { prepend: true };

export const WithAppend = Template.bind({});
// @ts-ignore
WithAppend.args = { append: true };

export const Complete = Template.bind({});
// @ts-ignore
Complete.args = { prepend: true, append: true };
