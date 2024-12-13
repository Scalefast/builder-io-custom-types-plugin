import { CustomMapOptions } from "../../models";

const actionMap: any = {
  set_key: (state: CustomMapOptions, action: any) => ({
    ...state,
    key: action.key,
  }),
  set_required: (state: CustomMapOptions, action: any) => ({
    ...state,
    required: action.required,
  }),
  set_helper_text: (state: CustomMapOptions, action: any) => ({
    ...state,
    helperText: action.helperText,
  }),
  set_type: (state: CustomMapOptions, action: any) => ({
    ...state,
    type: action.t,
  }),
  set_values: (state: CustomMapOptions, action: any) => ({
    ...state,
    values: action.values,
  }),
  set_tag: (state: CustomMapOptions, action: any) => ({
    ...state,
    values: [...state.values ?? [], action.tag]
  }),
  set_extra_options: (state: CustomMapOptions, action: any) => ({
    ...state,
    extraOptions: action.extraOptions
  })
};

export const mapFormReducer = (state: CustomMapOptions, action: any) => {
  const handler = actionMap[action.type] ?? null;

  return handler ? handler(state, action) : state;
};
