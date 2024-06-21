import { Builder } from '@builder.io/react';
import { PageComponent } from './components/page-creator.model'
import { CustomMap } from './components/map.model';

registerComponentFor();

function registerComponentFor() {
  Builder.registerEditor({
    name: 'Custom Page Component',
    component: PageComponent,
  });

  Builder.registerEditor({
    name: 'Custom Map',
    component: CustomMap,
  });
}
