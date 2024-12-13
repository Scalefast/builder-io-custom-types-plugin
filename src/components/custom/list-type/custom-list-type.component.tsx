/** @jsx jsx */
import { jsx } from '@emotion/core';
import { CustomMapOptions, CustomValue, MenuTypeProps } from '../../../models';
import { Column, Row } from '../../../utils';
import { FromType } from '../form/custom-form.component';
import { Button } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import { useEffect, useState } from 'react';

export const ListType = (props: MenuTypeProps) => {
  const currentValue = formatCurrentValue();
  const [items, setItems] = useState<{ [key: string]: CustomValue }[]>(currentValue);

  function newOption(): void {
    if (props.value.subOptions) {
      const newItem: { [key: string]: string | boolean | number } = {};
      props.value.subOptions.map((v: CustomMapOptions) => {
        newItem[v.key] = '';
      });
      setItems((oldValue) => [...oldValue, newItem]);
    }
  }

  function handleInput(val: any, index: number, key: string): void {
    setItems((oldValue) => {
      const newValue = oldValue;
      newValue[index][key] = val;

      return newValue;
    });
    props.onChange(items);
  }

  function handleRemove(index: number): void {
    const newValue = items.filter((o, i) => index != i)
    setItems(newValue);
    props.onChange(newValue);
  }

  function formatCurrentValue(): { [key: string]: CustomValue }[] {
    let currentValue: { [key: string]: CustomValue }[] = [];
    if (typeof props.currentValue?.options[props.value.key] == 'object') {
      currentValue = props.currentValue?.options[props.value.key] as unknown as { [key: string]: CustomValue }[];
    }

    return currentValue;
  }

  useEffect(() => {}, []);

  return (
    <Column id="column-item-list">
      {items.map((item, indexItem) => (
        <Column id={'column-item-list' + indexItem} css={{ backgroundColor: 'var(--off-background-4)', borderRadius: '4px', padding: '12px' }}>
          {props.value.subOptions &&
            props.value.subOptions.map((o: CustomMapOptions) => (
              <FromType
                css={{ marginTop: '30px' }}
                value={o}
                onChange={(val) => handleInput(val, indexItem, o.key)}
                currentValue={item[o.key]}
                context={props.context}
                renderEditor={props.renderEditor}
              ></FromType>
          ))}

          <Button
            aria-label="delete"
            size="small"
            onClick={(e) => handleRemove(indexItem)}
          >
            <ClearIcon /> Delete
          </Button>
        </Column>
      ))}

      <Row css={{ marginTop: 5, marginBottom: 10 }}>
        <Button onClick={newOption} variant="text">
          + New item
        </Button>
      </Row>
    </Column>
  );
};
