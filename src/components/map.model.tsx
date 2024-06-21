/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useObserver } from 'mobx-react';
import { CustomEditorProps } from '../interfaces/custom-editor';
import { useEffect, useState } from 'react';
import { Row } from './utils';
import { Button } from '@material-ui/core';
import { CustomMapOptions } from '../interfaces/custom-map';
import { CustomMapForm } from './map-form.model';

/*
* TODO
* Avoid duplicated keys
*/
export const CustomMap = (props: CustomEditorProps<any | undefined>) => {
  const initialValue = props.value ? props.value.map((opt: any) => opt.toJSON()) : [];
  const [ options, setOptions ] = useState<CustomMapOptions[]>(initialValue);

  function addNewOption(): void {
    const newOptions = [
      ...options,
      { key: '', type: '' }
    ];

    setOptions(newOptions);
    props.onChange(newOptions);
  }

  function changeOption(action: string, index: number, newValue?: CustomMapOptions): void {
    let currentOptions = options;
    if (action == 'update_option' && newValue) {
      currentOptions[index] = newValue;
      setOptions(currentOptions);
    } else if (action == 'delete_option') {
      currentOptions = currentOptions.filter((o, i) => index != i);
      setOptions(currentOptions);
    }

    props.onChange(currentOptions);
  }

  useEffect(() => {

  }, []);

  return useObserver(() => (
    <div>
      {options.map((option, index) => (
        <Row css={{ marginTop: 5, marginBottom: 10 }}>
          <CustomMapForm opt={option} index={index} onChange={changeOption}></CustomMapForm>
        </Row>
      ))}
      <Row css={{ marginTop: 5, marginBottom: 10 }}>
        <Button onClick={addNewOption} variant="text">+ New</Button>
      </Row>
    </div>
  ));
};
