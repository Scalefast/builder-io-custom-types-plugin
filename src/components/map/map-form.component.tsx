/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useObserver } from 'mobx-react';
import {
  Button,
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
import { Add as AddIcon } from '@material-ui/icons';
import { CustomApplicationContext, CustomMapFormProps, CustomMapOptions, CustomTypes, Model } from '../../models';
import { Column, getModels, Row } from '../../utils';
import { mapFormReducer } from './map-form-reducer.component';

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

  const [state, dispatch] = useReducer(mapFormReducer, initialState);
  const [tag, setTag] = useState<string>('');
  const [id] = useState<string>(`ìnput-component-prop-${props.index}`);
  const models: Model[] = getModels();


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
    const model = models.find((m) => m.name == value);
    if (model) {
      dispatch({
        type: 'set_extra_options',
        extraOptions: {
          'modelId': model.id,
          'modelName': model.name
        },
      });
    }
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
    <Row css={{ marginTop: 5, marginBottom: 10, background: 'var(--off-background-2)', padding: '10px 20px', borderRadius: 10 }}>
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
              {state.values && (
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
                <Select label="Data model" id={id} onChange={(e) => handleReferenceModel(e.target.value as string)} value={state.extraOptions.modelName}>
                  {models.map((d) => (
                    <MenuItem value={d.name}>{d.displayName.length > 0 ? d.displayName : d.name}</MenuItem>
                  ))}
                </Select>
              </div>
            </Column>
          )}

        </Row>

        <Row css={{ marginTop: 10 }}>
          <Column>
            <FormControl css={{ width: '100%', flexShrink: 0, flexGrow: 1 }}>
              <TextField
                label="Helper text (max 200 characters)"
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
