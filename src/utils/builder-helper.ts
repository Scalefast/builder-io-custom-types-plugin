import appState from '@builder.io/app-context';
import pkg from '../../package.json';
import { Model } from '../models';
import { Builder } from '@builder.io/sdk';

export type ContentAction = {
  label: string;
  showIf(content: any, model: any): Boolean;
  onClick(content: any): Promise<void>;
  isDisabled?: () => boolean;
  disabledTooltip?: string;
};

export const getModels = () => {
  const models: Model[] = [];
  for (const m of appState.models.result) {
    if (m.archived == false && m.kind == 'data' && m.name != 'page-components') {
      models.push({
        id: m.id,
        name: m.name,
        kind: m.kind,
        displayName: m.displayName
      });
    }
  }

  return models;
}

export const findModel = (name: string) => {
  return getModels().find((m) => m.name === name);
}

export const findModelById = (id: string) => {
  return getModels().find((m) => m.id === id);
}

export const pluginConfig = () => {
  const pluginSettings = appState.user.organization.value.settings.plugins?.get(pkg.name);
  const componentPage = pluginSettings?.get('componentPage');
  const componentName = pluginSettings?.get('componentName');

  return {
    componentPage: componentPage,
    componentName: componentName,
  }
}

export const registerContentAction = (contentAction: ContentAction) => {
  Builder.register('content.action', contentAction);
}
