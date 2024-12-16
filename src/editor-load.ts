import { Builder } from '@builder.io/react';
import appState from '@builder.io/app-context';
import { CustomComponentEditor, CustomMapEditor } from './components';
import { findModelById, pluginConfig } from './utils';

interface ContentEditorActions {
  updatePreviewUrl: (url: string) => void;
  safeReaction<T>(
    watchFunction: () => T,
    reactionFunction: (arg: T) => void,
    options?: {
      fireImmediately: true;
    }
  ): void;
}

export const onContentEditorLoad = ({ safeReaction, updatePreviewUrl }: ContentEditorActions) => {
  const pluginSettings = pluginConfig();
  if (!pluginSettings.componentName) {
    return;
  }

  Builder.registerEditor({
    name: 'Custom Page Component',
    component: CustomComponentEditor,
  });

  Builder.registerEditor({
    name: 'Custom Map',
    component: CustomMapEditor,
  });

  // safeReaction(
  //   () => {
  //     return {
  //       plugingConfig: pluginSettings,
  //       shouldCheck: String(appState.designerState.editingContentModel?.lastUpdated || ''),
  //     };
  //   },
  //   async (props: any) => {
  //     console.log(props);
  //     if (!props.shouldCheck) {
  //       return;
  //     }

  //     updatePublishCTA(appState.designerState.editingContentModel, props.plugingConfig.componentPage);
  //   },
  //   {
  //     fireImmediately: true,
  //   },
  // );
};
