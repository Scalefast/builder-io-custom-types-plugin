/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core';
import { SFComponent } from '../interfaces/page-components';
interface FormTypeProps { 
  name: string;
  type: string;
  values?: string[];
  onChange(e: any): void;
  currentValue: SFComponent | undefined
}

export const FromType = (props: FormTypeProps) => {
  if (props.type == 'number') {
    return <FormControl fullWidth>
      <TextField
        fullWidth
        css={{ marginTop: 30 }}
        label={props.name}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.currentValue?.options[props.name]}
        type="number"
      ></TextField>
    </FormControl>
  }

  if (props.type == 'boolean') {
    return <FormControl fullWidth>
      <FormControlLabel
        control={
          <Switch
            checked={props.currentValue?.options[props.name] ? true : false}
            onChange={(e) => props.onChange(e.target.checked)}
            value={props.currentValue?.options[props.name]}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={props.name}
      ></FormControlLabel>
    </FormControl>
  }

  if (props.type == 'select') {
    return <FormControl fullWidth>
      <InputLabel>{props.name}</InputLabel>
      <Select
        value={props.currentValue?.options[props.name]}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.values && props.values.map((comp: string) => (
          <MenuItem value={comp}>{comp}</MenuItem>
        ))}
      </Select>
    </FormControl>
  }

  return <FormControl fullWidth>
    <TextField
      fullWidth
      label={props.name}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.currentValue?.options[props.name]}
    ></TextField>
  </FormControl>
}