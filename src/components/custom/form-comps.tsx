/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FormControl, TextField } from '@material-ui/core';
import { FormTypeProps } from '../../models';
import { ReferenceType } from './reference-type';
import { camelCaseToHuman } from '../../utils';

export const FromType = (props: FormTypeProps) => {
  if (props.value.type == 'reference') {
    return (
      <FormControl fullWidth>
        <ReferenceType
          value={props.value}
          onChange={(value) => props.onChange(value)}
          currentValue={props.currentValue}
          context={props.context}
          renderEditor={props.renderEditor}
        ></ReferenceType>
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
