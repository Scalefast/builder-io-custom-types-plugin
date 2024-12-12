import { camelCaseToHuman } from '../../utils';

export const textType = (option: any) => {
  return {
    '@type': '@builder.io/core:Field',
    type: 'text',
    name: option.key,
    friendlyName: camelCaseToHuman(option.key),
    required: option.required ?? false,
    helperText: option.helperText ?? '',
  }
}

export const numberType = (option: any) => {
  return {
    '@type': '@builder.io/core:Field',
    type: 'number',
    name: option.key,
    friendlyName: camelCaseToHuman(option.key),
    required: option.required ?? false,
    helperText: option.helperText ?? '',
  }
}

export const booleanType = (option: any) => {
  return {
    '@type': '@builder.io/core:Field',
    type: 'boolean',
    name: option.key,
    friendlyName: camelCaseToHuman(option.key),
    required: option.required ?? false,
    helperText: option.helperText ?? '',
  }
}

export const referenceType = (option: any) => {
  return {
    '@type': '@builder.io/core:Field',
    type: 'reference',
    name: option.key,
    friendlyName: camelCaseToHuman(option.key),
    required: option.required ?? false,
    helperText: option.helperText ?? '',
    modelId: option.extraOptions?.modelId ?? '',
    model: '',
    showTemplatePicker: true,
    autoFocus: false,
    simpleTextOnly: false,
    disallowRemove: false,
    broadcast: false,
    bubble: false,
    hideFromUI: false,
    hideFromFieldsEditor: false,
    permissionsRequiredToEdit: '',
    advanced: false,
    onChange: '',
    showIf: '',
    mandatory: false,
    hidden: false,
    noPhotoPicker: false,
    subFields: [],
    meta: {},
    behavior: "",
    copyOnAdd: true,
    defaultCollapsed: false,
    supportsAiGeneration: false,
  }
}

export const fileType = (option: any) => {
  return {
    '@type': '@builder.io/core:Field',
    type: 'file',
    name: option.key,
    friendlyName: camelCaseToHuman(option.key),
    required: option.required ?? false,
    helperText: option.helperText ?? '',
    showTemplatePicker: true,
    autoFocus: false,
    simpleTextOnly: false,
    disallowRemove: false,
    broadcast: false,
    bubble: false,
    hideFromUI: false,
    hideFromFieldsEditor: false,
    permissionsRequiredToEdit: '',
    advanced: false,
    copyOnAdd: false,
    onChange: '',
    showIf: '',
    mandatory: false,
    hidden: false,
    noPhotoPicker: false,
    allowedFileTypes: [
      "jpeg",
      "png",
      "svg",
      "webp",
      "gif",
    ],
    subFields: [],
  }
}

export const selectType = (option: any) => {
  return {
    '@type': '@builder.io/core:Field',
    type: 'select',
    name: option.key,
    friendlyName: camelCaseToHuman(option.key),
    required: option.required ?? false,
    helperText: option.helperText ?? '',
    enum: option.values ?? [],
    model: '',
    modelId: '',
    showTemplatePicker: true,
    autoFocus: false,
    simpleTextOnly: false,
    disallowRemove: false,
    broadcast: false,
    bubble: false,
    hideFromUI: false,
    hideFromFieldsEditor: false,
    permissionsRequiredToEdit: '',
    advanced: false,
    copyOnAdd: false,
    onChange: '',
    showIf: '',
    mandatory: false,
    hidden: false,
    noPhotoPicker: false,
    subFields: [],
    meta: {}
  }
}
