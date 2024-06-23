/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core';
import { CustomMapOptions, SFComponent } from '../../models';

type FormTypeProps = {
  value: CustomMapOptions;
  onChange(e: any): void;
  currentValue: SFComponent | undefined
}

export const FromType = (props: FormTypeProps) => {
  if (props.value.type == 'number') {
    return <FormControl fullWidth>
      <TextField
        fullWidth
        css={{ marginTop: 30 }}
        label={props.value.key}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.currentValue?.options[props.value.key]}
        type="number"
      ></TextField>
    </FormControl>
  }

  if (props.value.type == 'boolean') {
    return <FormControl fullWidth>
      <FormControlLabel
        control={
          <Switch
            checked={props.currentValue?.options[props.value.key] ? true : false}
            onChange={(e) => props.onChange(e.target.checked)}
            value={props.currentValue?.options[props.value.key]}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={props.value.key}
      ></FormControlLabel>
    </FormControl>
  }

  if (props.value.type == 'select') {
    return <FormControl fullWidth>
      <InputLabel>{props.value.key}</InputLabel>
      <Select
        value={props.currentValue?.options[props.value.key]}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.value.values && props.value.values.map((comp: string) => (
          <MenuItem value={comp}>{comp}</MenuItem>
        ))}
      </Select>
    </FormControl>
  }

  return <FormControl fullWidth>
    <TextField
      fullWidth
      label={props.value.key}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.currentValue?.options[props.value.key]}
    ></TextField>
  </FormControl>
}
