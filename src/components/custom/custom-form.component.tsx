/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FormControl, TextField } from '@material-ui/core';
import { FormTypeProps } from '../../models';
import { camelCaseToHuman } from '../../utils';

export const FromType = (props: FormTypeProps) => {
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
