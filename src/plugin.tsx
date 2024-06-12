import { Builder } from '@builder.io/react';
import { PageComponent } from './components/page-component.model'

registerComponentFor();

function registerComponentFor() {
  Builder.registerEditor({
    name: 'Custom Page Component',
    component: PageComponent,
  });
}
