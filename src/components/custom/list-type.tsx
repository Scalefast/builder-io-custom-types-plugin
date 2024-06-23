/** @jsx jsx */
import { jsx } from '@emotion/core';
import { CustomMapOptions, SFComponent } from '../../models';
import { Column } from '../../utils';
import { FromType } from './form-comps';

type MenuTypeProps = {
  value: CustomMapOptions;
  onChange(e: any): void;
  currentValue: SFComponent | undefined
}

export const ListType = (props: MenuTypeProps) => {

  return (
    <Column>
      {
        props.value.subOptions && props.value.subOptions.map((o) => (
          <FromType
            css={{ marginTop: '30px' }}
            value={o}
            onChange={(val) => console.log(val)}
            currentValue={props.currentValue}
          ></FromType>
        ))
      }
    </Column>
  )
}
