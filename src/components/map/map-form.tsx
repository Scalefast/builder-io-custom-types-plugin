/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useObserver } from 'mobx-react';
import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useEffect, useReducer, useState } from 'react';
import { Clear as ClearIcon } from '@material-ui/icons';
import { CustomMapOptions, CustomTypes } from '../../models';
import { Column, Row } from '../../utils';
import { CustomApplicationContext, Model } from '../../models/custom-application-context';

interface CustomMapFormProps {
  opt: CustomMapOptions;
  onChange(action: string, index: number, newValue?: CustomMapOptions): void;
  index: number;
  context: CustomApplicationContext,
}

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

const reducer = (state: CustomMapOptions, action: any) => {
  const handler = actionMap[action.type] ?? null;

  return handler ? handler(state, action) : state;
};

export const CustomMapForm = (props: CustomMapFormProps) => {
  const initialState = {
    key: props.opt.key,
    type: props.opt.type,
    required: props.opt.required ?? false,
    helperText: props.opt.helperText ?? '',
    values: props.opt.values ?? [],
  } as CustomMapOptions;

  if (props.opt.extraOptions) {
    initialState.extraOptions = props.opt.extraOptions;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [tag, setTag] = useState<string>('');
  const [id] = useState<string>(`ìnput-component-prop-${props.index}`);
  const models: Model[] = [];
  for (const m of props.context.models.result) {
    if (m.archived == false && m.kind == 'data' && m.name != 'page-components') {
      models.push({
        id: m.id,
        name: m.name,
        kind: m.kind,
        displayName: m.displayName
      });
    }
  }

  function handleChangeKey(v: string): void {
    dispatch({
      type: 'set_key',
      key: v,
    });
  }

  function handleChangeRequired(v: boolean): void {
    dispatch({
      type: 'set_required',
      required: v,
    });
  }

  function handleChangeHelperText(v: string): void {
    dispatch({
      type: 'set_helper_text',
      helperText: v,
    });
  }

  function handleChangeType(v: string): void {
    if (state.values && v != 'select') {
      dispatch({
        type: 'set_values',
        values: [],
      });
    }

    if (state.extraOptions == null && v == 'reference') {
      dispatch({
        type: 'set_extra_options',
        extraOptions: {
          'modelId': ''
        },
      });
    }

    dispatch({
      type: 'set_type',
      t: v,
    });
  }

  function handleReferenceModel(value: string): void {
    dispatch({
      type: 'set_extra_options',
      extraOptions: {
        'modelId': value
      },
    });
  }

  function handleChangeValues(pressedKey: string): void {
    if (pressedKey == 'Enter') {
      const newTag = tag;
      dispatch({
        type: 'set_tag',
        tag: newTag,
      });
      setTag('');
    }
  }

  function handleDeleteTag(index: number): void {
    const currentOptions = state.values.filter((o: any, i: number) => index != i);
    dispatch({
      type: 'set_values',
      values: currentOptions,
    });
  }

  useEffect(() => {
    props.onChange('update_option', props.index, state);
  }, [state]);

  return useObserver(() => (
    <Row css={{ marginTop: 5, marginBottom: 10 }}>
      <Column>
        <Row>
          <div>
            <FormControl>
              <TextField
                label="Key"
                value={state.key}
                onChange={(e) => handleChangeKey(e.target.value)}
                id={id + '-value'}
              ></TextField>
            </FormControl>
          </div>
          <div>
            <InputLabel css={{ display: 'block', paddingBottom: 10, fontSize: 14, fontWeight: 500 }} id={id + '-label'}>
              Type
            </InputLabel>
            <Select label="Type" id={id} onChange={(e) => handleChangeType(e.target.value as string)} value={state.type}>
              {CustomTypes.map((d) => (
                <MenuItem value={d.key}>{d.type}</MenuItem>
              ))}
            </Select>
          </div>

          {state.type == 'select' && (
          <Column>
              <div>
                <FormControl>
                  <TextField
                    label="Values (insert value a push Enter)"
                    value={tag}
                    onKeyDown={(e) => handleChangeValues(e.key)}
                    onChange={(e) => setTag(e.target.value)}
                    defaultValue=""
                    id={id + '-values'}
                  ></TextField>
                </FormControl>
              </div>
            {state.type == 'select' && state.values && (
              <div>
                {state.values.map((t: any, index: number) => (
                  <Chip
                  css={{ marginRight: '5px', marginBottom: '5px' }}
                  label={t}
                  onDelete={() => handleDeleteTag(index)}
                  deleteIcon={<ClearIcon />}
                  />
                ))}
              </div>
            )}
          </Column>
          )}

          {state.type == 'reference' && (
          <Column>
            <div>
              <InputLabel css={{ display: 'block', paddingBottom: 10, fontSize: 14, fontWeight: 500 }} id={id + '-reference'}>
                Data Model
              </InputLabel>
              <Select label="Data model" id={id} onChange={(e) => handleReferenceModel(e.target.value as string)} value={state.extraOptions.modelId}>
                {models.map((d) => (
                  <MenuItem value={d.id}>{d.displayName.length > 0 ? d.displayName : d.name}</MenuItem>
                ))}
              </Select>
            </div>
          </Column>
          )}
        </Row>
        <Row>
          <Column>
            <FormControl css={{ width: '100%', flexShrink: 0, flexGrow: 1 }}>
              <TextField
                label="Helper text (max 200 caractéres)"
                value={state.helperText}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => handleChangeHelperText(e.target.value)}
                id={id + '-hint'}
              ></TextField>
            </FormControl>
            <div css={{ width: '100%', flexShrink: 0, flexGrow: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={state.required} onChange={(e) => handleChangeRequired(e.target.checked)} />}
                label="Make option as required"
              />
            </div>
          </Column>
        </Row>
      </Column>
      <div>
        <IconButton aria-label="delete" size="small" onClick={(e) => props.onChange('delete_option', props.index)}>
          <ClearIcon />
        </IconButton>
      </div>
    </Row>
  ));
};
