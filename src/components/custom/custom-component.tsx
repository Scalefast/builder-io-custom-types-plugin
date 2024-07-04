/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useObserver } from 'mobx-react';
import { BuilderContent } from '@builder.io/sdk';
import { useEffect, useReducer } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CustomEditorProps, CustomMapOptions, SFComponent, SFComponentOptions, SFComponentState, defaultComponents } from '../../models'
import { CenterRow, Column } from '../../utils';
import { FromType } from './form-comps';
import ApiService from '../../services/api.service';
import { ListType } from './list-type';

const actionMap: any = {
  'set_selected_component': (state: SFComponentState, action: any) => ({
    ...state,
    selectedComponent: action.selectedComponent,
  }),
  'set_list_components': (state: SFComponentState, action: any) => ({
    ...state,
    customPageComps: action.customPageComps,
  }),
  'set_list_components_and_selected': (state: SFComponentState, action: any) => ({
    ...state,
    customPageComps: action.customPageComps,
    selectedComponent: action.selectedComponent,
  }),
  'set_type_change': (state: SFComponentState, action: any) => ({
    ...state,
    selectedId: action.selectedId,
    currentValue: action.currentValue,
    selectedComponent: action.selectedComponent,
  }),
  'set_option_change': (state: SFComponentState, action: any) => ({
    ...state,
    currentValue: action.currentValue,
  })
}

const reducer = (state: SFComponentState, action: any) => {
  const handler = actionMap[action.type] ?? null;

  return handler ? handler(state, action) : state;
}

export const CustomComponent = (props: CustomEditorProps<SFComponent | undefined>) => {
  const { user } = props.context;
  const apiService = new ApiService();
  const value = props.value ? props.value.toJSON() : undefined;
  const initialSelectedId = value ? value.id : '';
  const initialState = {
    currentValue: value,
    customPageComps: [],
    selectedComponent: undefined,
    selectedId: initialSelectedId,
  } as SFComponentState;

  const [state, dispatch] = useReducer(reducer, initialState);

  async function getModels() {
    const url = `page-components?apiKey=${user.apiKey}&query.published.$ne=archived&limit=50&cachebust=true`;
    const fetchedComps = await apiService.getModels(url, user.authHeaders);

    let result = Array.isArray(fetchedComps.results) ? transformComponents(fetchedComps.results) : [];
    result = result.concat(defaultComponents);
    const selectedComponent = state.selectedId ? result.find((c) => c.id == state.selectedId): undefined;

    if (result && selectedComponent) {
      dispatch({
        type: 'set_list_components_and_selected',
        selectedComponent: selectedComponent,
        customPageComps: result,
      });
    } else {
      dispatch({
        type: 'set_list_components',
        customPageComps: result,
      });
    }
  }

  function transformComponents(fetchedComps: BuilderContent[]): SFComponentOptions[] {
    let listOfComponents: SFComponentOptions[] = [];
    listOfComponents = fetchedComps.map((comp) => {
      const id = comp.data?.name ?? '';
      const options: CustomMapOptions[] = comp.data?.options ?? [];
      const title = comp.name ?? id;
      return { id, options, title } as SFComponentOptions;
    });
    return listOfComponents;
  }

  function handleChange(e: any) {
    const selected = state.customPageComps.find((c: SFComponentOptions) => c.id == e.target.value);
    if (selected) {
      const value = { id: selected.id, title: selected.title, options: {} } as SFComponent;
      dispatch({
        type: 'set_type_change',
        selectedId: e.target.value,
        currentValue: value,
        selectedComponent: selected,
      });

      props.onChange(value);
    }
  }

  function handleOptionChange(value: any, key: string): void {
    if (state.currentValue) {
      const newValue = state.currentValue as SFComponent;
      newValue.options[key] = value;
      newValue.updated = new Date().valueOf();
      dispatch({
        type: 'set_option_change',
        currentValue: newValue,
      });
      props.onChange(newValue);
    }
  }

  useEffect(() => {
    getModels();
  }, []);

  return useObserver(() => (
    <CenterRow css={{ marginTop: 5, marginBottom: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="input-component-template-label">Select custom component template</InputLabel>
        <Select
          labelId="input-component-template-label"
          id="input-component-template"
          css={{ marginTop: 30 }}
          value={state.selectedId}
          onChange={handleChange}
        >
          {state.customPageComps.map((comp: SFComponentOptions) => (
            <MenuItem value={comp.id}>{comp.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Column css={{ gap: '30px', marginTop: '20px' }}>
        {state.selectedComponent &&
          state.selectedComponent.options.map((option: CustomMapOptions) => {
            if (option.type == 'list') {
              return <ListType
                value={option}
                onChange={(val) => handleOptionChange(val, option.key)}
                currentValue={state.currentValue}
              ></ListType>
            } else {
              return <FromType
                css={{ marginTop: '30px' }}
                value={option}
                onChange={(val) => handleOptionChange(val, option.key)}
                currentValue={state.currentValue?.options[option.key]}
              ></FromType>
            }
        })}
      </Column>
    </CenterRow>
  ));
};
