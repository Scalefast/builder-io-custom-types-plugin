/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useObserver } from 'mobx-react';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import {
  CustomEditorProps,
  CustomMapOptions,
  SFComponent,
  SFComponentOptions,
  SFComponentState,
  booleanType,
  defaultComponents,
  fileType,
  numberType,
  referenceType,
  selectType,
  textType,
} from '../../models';
import { CenterRow, Column, fastClone, transformComponents } from '../../utils';
import ApiService from '../../services/api.service';
import { ListType } from './list-type/custom-list-type.component';
import { IObjectDidChange, observable, observe } from 'mobx';
import { customComponentsReducer } from './custom-reduer.component';

export const CustomComponentEditor = (props: CustomEditorProps<SFComponent | undefined>) => {
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
  const [state, dispatch] = useReducer(customComponentsReducer, initialState);
  const [currentValue, setCurrentValue] = useState<SFComponent | undefined>(value);
  const optionsObject = observable.map({}, { deep: false });

  async function getModels() {
    const params = `query.published.$eq=published&limit=50&cachebust=true&fields=data,id,name`;
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

  function observeChanges(change: IObjectDidChange) {
    if (change.type === 'update' || change.type === 'add') {
      handleOptionChange(typeof change.newValue == 'object' ? change.newValue.toJSON(): change.newValue, change.name.toString());
    }
  }

  async function loadContentInfo(referenceValue: any): Promise<any> {
    const params = `query.published.$eq=published&limit=50&cachebust=true`;
    return await apiService.getContent(referenceValue.model, referenceValue.id, props.context, params);
  }

  async function currentData(): Promise<void> {
    const copyCurrentValue = currentValue;
    if (copyCurrentValue) {
      for (const value of Object.keys(copyCurrentValue.options)) {
        let keyValue = copyCurrentValue.options[value];
        if (typeof keyValue === 'object' && '@type' in keyValue && keyValue['@type'] === '@builder.io/core:Reference') {
          const apiValue = await loadContentInfo(keyValue);
          if (apiValue) {
            keyValue.value = apiValue;
            copyCurrentValue.options[value] = keyValue;
          }
        }
      }
    }

    optionsObject.replace(copyCurrentValue ? copyCurrentValue.options : {});
    observe(optionsObject, observeChanges);
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
          options: options
        };
      }

      return {
        ...prevValue,
        options: {
          ...prevValue.options,
          [key]: value,
        }
      };
    });
  }

  function getFields(comp: SFComponentOptions): any[] {
    const fields: any[] = [];
    comp.options.map((option) => {
      if (option.type == 'reference') {
        fields.push(referenceType(option));
      }

      if (option.type == 'text') {
        fields.push(textType(option));
      }

      if (option.type == 'number') {
        fields.push(numberType(option));
      }

      if (option.type == 'assets_image') {
        fields.push(fileType(option));
      }

      if (option.type == 'boolean') {
        fields.push(booleanType(option));
      }

      if (option.type == 'select' && option.values !== undefined && option.values.length > 0) {
        fields.push(selectType(option));
      }
    });
    return fields;
  }

  useEffect(() => {
    currentData();
  });

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
    <React.Fragment>
      <CenterRow css={{ marginTop: 5, marginBottom: 10, width: '100%' }}>
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

        {(state.selectedComponent && optionsObject) && (
          <div css={{ width: '100%', marginTop: 15 }}>
            {props.renderEditor({
              object: optionsObject,
              fields: getFields(state.selectedComponent),
              onChange: (map: any) => {
                debugger;
                const options = fastClone(map);
                console.log(options);
              },
            })}
          </div>
        )}

        <Column>
          {state.selectedComponent &&
            state.selectedComponent.options.map((option: CustomMapOptions) => {
              if (option.type == 'custom_list') {
                return (
                  <ListType
                    value={option}
                    onChange={(val) => handleOptionChange(val, option.key)}
                    currentValue={currentValue}
                    context={props.context}
                    renderEditor={props.renderEditor}
                  ></ListType>
                );
              }
            })}
        </Column>
      </CenterRow>
    </React.Fragment>
  ));
};
