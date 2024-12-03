/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core';
import { FormTypeProps } from '../../models';
import { ReferenceType } from './reference-type';
import { camelCaseToHuman } from '../../utils';
import { ImageType } from './image-type';

export const FromType = (props: FormTypeProps) => {
  if (props.value.type == 'number') {
    return (
      <FormControl fullWidth>
        <TextField
          fullWidth
          css={{ marginTop: 30 }}
          label={camelCaseToHuman(props.value.key)}
          onChange={(e) => props.onChange(e.target.value)}
          value={props.currentValue}
          type="number"
        ></TextField>
      </FormControl>
    );
  }

  if (props.value.type == 'boolean') {
    return (
      <FormControl fullWidth>
        <FormControlLabel
          control={
            <Switch
              checked={props.currentValue ? true : false}
              onChange={(e) => props.onChange(e.target.checked)}
              value={props.currentValue}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label={camelCaseToHuman(props.value.key)}
        ></FormControlLabel>
      </FormControl>
    );
  }

  if (props.value.type == 'select') {
    return (
      <FormControl fullWidth>
        <InputLabel>{camelCaseToHuman(props.value.key)}</InputLabel>
        <Select value={props.currentValue} onChange={(e) => props.onChange(e.target.value)}>
          {props.value.values && props.value.values.map((comp: string) => <MenuItem value={comp}>{comp}</MenuItem>)}
        </Select>
      </FormControl>
    );
  }

  if (props.value.type == 'reference') {
    return (
      <FormControl fullWidth>
        <ReferenceType
          value={props.value}
          onChange={(value) => props.onChange(value)}
          currentValue={props.currentValue}
          context={props.context}
        ></ReferenceType>
      </FormControl>
    );
  }

  if (props.value.type == 'assets_image') {
    return (
      <FormControl fullWidth>
        <ImageType
          value={props.value}
          onChange={(value) => props.onChange(value)}
          currentValue={props.currentValue}
          context={props.context}
        ></ImageType>
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        label={camelCaseToHuman(props.value.key)}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.currentValue}
      ></TextField>
    </FormControl>
  );
};
