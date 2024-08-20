import { Builder } from '@builder.io/react';
import { CustomMap, CustomComponent, CustomMedia as EswCustomMedia } from './components';

Builder.registerEditor({
  name: 'Custom Page Component',
  component: CustomComponent,
});

Builder.registerEditor({
  name: 'Custom Map',
  component: CustomMap,
});

Builder.registerComponent(EswCustomMedia, {
  name: 'EswCustomMedia',
  type: 'react',
  inputs: [
    {
      name: 'text',
      type: 'string',
      defaultValue: 'Hello, world!',
    },
  ],
});

// Builder.register('insertMenu', {
//   name: 'ESW Components',
//   items: [
//     { name: 'CustomMedia' },
//   ],
// });
