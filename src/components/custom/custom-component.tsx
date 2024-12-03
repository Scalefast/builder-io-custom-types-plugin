/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useObserver } from 'mobx-react';
import { BuilderContent } from '@builder.io/sdk';
import { useEffect, useReducer, useRef, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import {
  CustomEditorProps,
  CustomMapOptions,
  SFComponent,
  SFComponentOptions,
  SFComponentState,
  defaultComponents,
} from '../../models';
import { CenterRow, Column } from '../../utils';
import { FromType } from './form-comps';
import ApiService from '../../services/api.service';
import { ListType } from './list-type';

const actionMap: any = {
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

const reducer = (state: SFComponentState, action: any) => {
  const handler = actionMap[action.type] ?? null;

  return handler ? handler(state, action) : state;
};

export const CustomComponent = (props: CustomEditorProps<SFComponent | undefined>) => {
  const { context } = props;
  const apiService = new ApiService();
  const value = props.value ? props.value.toJSON() : undefined;
  const initialSelectedId = value ? value.id : '';
  const initialState = {
    customPageComps: [],
    selectedComponent: undefined,
    selectedId: initialSelectedId,
  } as SFComponentState;
  const isInitialRender = useRef(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentValue, setCurrentValue] = useState<SFComponent | undefined>(value);

  async function getModels() {
    const params = `query.published.$eq=published&limit=50&cachebust=true&fields=data,id`;
    const fetchedComps = await apiService.getModel('page-components', context, params);
    let result = Array.isArray(fetchedComps.results) ? transformComponents(fetchedComps.results) : [];
    result = result.concat(defaultComponents);
    const selectedComponent = state.selectedId ? result.find((c) => c.id == state.selectedId) : undefined;

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
        selectedComponent: selected,
      });

      setCurrentValue(value);
    }
  }

  function handleOptionChange(value: any, key: string): void {
    setCurrentValue((prevValue) => {
      if (!prevValue) {
        return prevValue;
      }

      if (value == undefined) {
        const options = prevValue.options;
        delete options[key];
        return {
          ...prevValue,
          options: options,
          updated: Date.now(),
        };
      }

      return {
        ...prevValue,
        options: {
          ...prevValue.options,
          [key]: value,
        },
        updated: Date.now(),
      };
    });
  }

  useEffect(() => {
    getModels();
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    props.onChange(currentValue);
  }, [currentValue]);

  return useObserver(() => (
    <CenterRow css={{ marginTop: 5, marginBottom: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="input-component-template-label">Select custom component</InputLabel>
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
              return (
                <ListType
                  value={option}
                  onChange={(val) => handleOptionChange(val, option.key)}
                  currentValue={currentValue}
                  context={props.context}
                ></ListType>
              );
            } else {
              return (
                <FromType
                  css={{ marginTop: '30px' }}
                  value={option}
                  onChange={(val) => handleOptionChange(val, option.key)}
                  currentValue={currentValue?.options[option.key]}
                  context={props.context}
                ></FromType>
              );
            }
          })}
      </Column>
    </CenterRow>
  ));
};
