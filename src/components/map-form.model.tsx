/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useObserver } from 'mobx-react';
import { Column, Row } from './utils';
import { Chip, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { CustomMapOptions, CustomTypes } from '../interfaces/custom-map';
import { useEffect, useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';

interface CustomMapFormProps {
  opt: CustomMapOptions
  onChange(action: string, index: number, newValue?: CustomMapOptions): void;
  index: number
}

export const CustomMapForm = (props: CustomMapFormProps) => {
  const [key, setKey] = useState<string>(props.opt.key);
  const [type, setType] = useState<string>(props.opt.type);
  const [values, setValues] = useState<string[]>(props.opt.values ?? []);
  const [tag, setTag] = useState<string>('');
  const [id] = useState<string>(`ìnput-component-prop-${props.index}`);

  function handleChangeKey(v: string): void {
    setKey(v);
    const newValue: CustomMapOptions = { key: v, type: type };

    if (type == 'select') {
      newValue.values = values;
    }

    props.onChange('update_option', props.index, newValue);
  }

  function handleChangeType(v: string): void {
    const newValue: CustomMapOptions = { key: key, type: v };
    if (values && v != 'select') {
      setValues([]);
    }

    if (v == 'select') {
      newValue.values = values;
    }

    setType(v);
    props.onChange('update_option', props.index, newValue);
  }

  function handleChangeValues(pressedKey: string): void {
    if (pressedKey == 'Enter') {
      const currentValues = values;
      props.onChange('update_option', props.index, { key: key, type: type, values: [...currentValues, tag] });
      setValues([...currentValues, tag]);
      setTag('');
    }
  }

  function handleDeleteTag(index: number): void {
    const currentOptions = values.filter((o, i) => index != i);
    setValues(currentOptions);
    props.onChange('update_option', props.index, { key: key, type: type, values: currentOptions });
  }

  useEffect(() => {

  }, []);

  return useObserver(() => (
    <Row css={{ marginTop: 5, marginBottom: 10 }}>
      <div>
        <FormControl>
          <TextField
            label="Key"
            value={key}
            onChange={(e) => handleChangeKey(e.target.value)}
            id={id + '-value'}
          ></TextField>
        </FormControl>
      </div>
      <div>
        <InputLabel
          css={{ display: 'block', paddingBottom: 10, fontSize: 14, fontWeight: 500 }}
          id={id + '-label'}
        >
          Type
        </InputLabel>
        <Select
          label="Type"
          id={id}
          onChange={(e) => handleChangeType(e.target.value as string)}
          value={type}
        >
          {CustomTypes.map((d) => (
            <MenuItem value={d.key}>{d.type}</MenuItem>
          ))}
        </Select>
      </div>
      <Column>
        {
          type == "select" && (
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
          )
        }
        { values && (
          <div>
          { values.map((t, index) => (
            <Chip
              css={{ marginRight: '5px'}}
              label={t}
              onDelete={() => handleDeleteTag(index)}
              deleteIcon={<ClearIcon />}
            />
          ))}
          </div>
        )}
      </Column>
      <div>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={(e) => props.onChange('delete_option', props.index)}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </Row>
  ));
}
