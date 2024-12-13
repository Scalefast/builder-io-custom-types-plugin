import { SFComponentState } from "../../models";

const customComponentActionMap: any = {
  set_selected_component: (state: SFComponentState, action: any) => ({
    ...state,
    selectedComponent: action.selectedComponent,
  }),
  set_list_components: (state: SFComponentState, action: any) => ({
    ...state,
    customPageComps: action.customPageComps,
  }),
  set_list_components_and_selected: (state: SFComponentState, action: any) => ({
    ...state,
    customPageComps: action.customPageComps,
    selectedComponent: action.selectedComponent,
  }),
  set_type_change: (state: SFComponentState, action: any) => ({
    ...state,
    selectedId: action.selectedId,
    selectedComponent: action.selectedComponent,
  }),
};

export const customComponentsReducer = (state: SFComponentState, action: any) => {
  const handler = customComponentActionMap[action.type] ?? null;

  return handler ? handler(state, action) : state;
};
