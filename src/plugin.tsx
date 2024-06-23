import { Builder } from '@builder.io/react';
import { CustomMap, CustomComponent } from './components';

registerComponentFor();

function registerComponentFor() {
  Builder.registerEditor({
    name: 'Custom Page Component',
    component: CustomComponent,
  });

  Builder.registerEditor({
    name: 'Custom Map',
    component: CustomMap,
  });
}
