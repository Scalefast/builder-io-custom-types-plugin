/** @jsx jsx */
import { jsx } from '@emotion/core';
import { CustomEditorProps } from '../interfaces/custom-editor';
import { useObserver } from 'mobx-react';
import { CenterRow } from './utils';
import { BuilderContent } from '@builder.io/sdk';
import { useEffect, useReducer } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { SFComponent, SFComponentOptions, SFComponentState } from '../interfaces/page-components';
import ApiService from '../services/api.service';
import { CustomMapOptions } from '../interfaces/custom-map';

const actionMap: any = {
  'set_selected_component': (state: SFComponentState, action: any) => ({
    ...state,
    selectedComponent: action.selectedComponent,
    selectedId: action.selectedId,
  }),
  'set_list_components': (state: SFComponentState, action: any) => ({
    ...state,
    customPageComps: action.customPageComps,
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

export const PageComponent = (props: CustomEditorProps<any | undefined>) => {
  const { user } = props.context;
  const apiService = new ApiService();
  const value = props.value ? props.value.toJSON() : undefined;
  const initialSelectedId = value ? value.id : '';
  const initialSelectedComponent = undefined;
  // const initialSelectedComponent = value ? transformCurrent(value) : undefined;
  const initialState = {
    currentValue: value,
    customPageComps: [],
    selectedComponent: initialSelectedComponent,
    selectedId: initialSelectedId,
  } as SFComponentState;

  const [state, dispatch] = useReducer(reducer, initialState);

  async function getModels() {
    const url = `page-components?apiKey=${user.apiKey}&query.published.$ne=archived&limit=50&cachebust=true`;
    const fetchedComps = await apiService.getModels(url, user.authHeaders);

    const result = Array.isArray(fetchedComps.results) ? transformComponents(fetchedComps.results) : [];
    dispatch({
      type: 'set_list_components',
      customPageComps: result,
    });
  }

  function transformComponents(fetchedComps: BuilderContent[]): SFComponentOptions[] {
    let listOfComponents: SFComponentOptions[] = [];
    listOfComponents = fetchedComps.map((comp) => {
      debugger;
      const id = comp.data?.name ?? '';
      const options: CustomMapOptions[] = comp.data?.options ?? [];
      const title = comp.name ?? id;
      return { id, options, title } as SFComponentOptions;
    });
    return listOfComponents;
  }

  // function transformCurrent(current: SFComponent): SFComponentOptions {
  //   const newValue = {
  //     id: current.id,
  //     options: Object.keys(current.options),
  //     title: current.title ?? current.id
  //   };

  //   return newValue;
  // }

  function handleChange(e: any) {
    const selected = state.customPageComps.find((c: SFComponentOptions) => c.id == e.target.value);
    if (selected) {
      const value = { id: selected.id, options: {} } as SFComponent;
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
      const newValue = state.currentValue;
      newValue.options[key] = value;
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

      {state.selectedComponent &&
        state.selectedComponent.options.map((option: string) => (
          <FormControl fullWidth>
            <TextField
              fullWidth
              css={{ marginTop: 30 }}
              label={option}
              defaultValue=""
              id={option}
              onChange={(e) => handleOptionChange(e.target.value, option)}
              value={state.currentValue?.options[option]}
            ></TextField>
          </FormControl>
        ))}
    </CenterRow>
  ));
};
