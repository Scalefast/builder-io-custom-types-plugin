import { Builder } from '@builder.io/react';
import appState from '@builder.io/app-context';
import pkg from '../package.json';
import { AppActions, OnSaveActions } from './models';
import { pluginConfig } from './utils';
import { onContentEditorLoad } from './editor-load';

Builder.register('plugin', {
  id: pkg.name,
  name: 'ESW Plugin',
  settings: [
    {
      name: 'componentPage',
      type: 'text',
      defaultValue: 'page-creator',
      helperText: 'Data model name for page model',
    },
    {
      name: 'componentName',
      type: 'text',
      defaultValue: 'page-components',
      helperText: 'Data model name for custom components',
    }
  ],
  ctaText: 'Save',
  async onSave(actions: OnSaveActions) {
    await actions.updateSettings({
      hasConfig: true,
    });

    appState.dialogs.alert('Plugin settings saved.');
  },
});

Builder.register('app.onLoad', async ({ triggerSettingsDialog }: AppActions) => {
  const pluginSettings = pluginConfig();
  if (!pluginSettings.componentPage || !pluginSettings.componentName) {
    await triggerSettingsDialog(pkg.name);
  }
});

Builder.register('editor.onLoad', onContentEditorLoad);
