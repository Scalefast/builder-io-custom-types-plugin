/** @jsx jsx */
import { jsx } from '@emotion/core';
import { CustomValue, FormTypeProps } from '../../models';
import { useObserver } from 'mobx-react';
import { camelCaseToHuman, Column, findModel } from '../../utils';
import { Button, IconButton } from '@material-ui/core';
import { Add as AddIcon, Clear as ClearIcon, Edit as EditIcon } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import ApiService from '../../services/api.service';
import appState from '@builder.io/app-context';

export const ReferenceType = (props: FormTypeProps) => {
  const apiService = new ApiService();
  let modelId = '';
  let modelName = '';
  if (props.value.extraOptions) {
    modelName = props.value.extraOptions.modelName;
    const model = findModel(modelName);
    if (model) {
      modelId = model.id;
    }
  }

  let key = camelCaseToHuman(props.value.key);
  let errorMsg = '';
  if (props.value.required) {
    errorMsg = `Field ${key} is required`;
    key = key + ' *';
  }

  const [currentValue, setCurrentValue] = useState<CustomValue | undefined>(props.currentValue);
  const [componentInfo, setComponentInfo] = useState<Record<string, any> | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const isInitialRender = useRef(true);

  async function loadContentInfo(contentId: string): Promise<void> {
    const params = `query.published.$eq=published&limit=50&cachebust=true&fields=name,id`;
    const result = await apiService.getContent(modelName, contentId, props.context, params);
    setComponentInfo(result);
  }

  function choseContent(value: any) {
    setCurrentValue({
      '@type': '@builder.io/core:Reference',
      id: value,
      model: modelName,
    });
  }

  function deleteReference() {
    setCurrentValue(undefined);
  }

  async function openContentSelector() {
    const dataPicked = await appState.globalState.showContentPickerDialog({
      modelId: modelId,
      query: [
        {
          '@type': '@builder.io/core:Query',
          property: 'query.published',
          operator: 'is',
          value: 'published',
        },
      ],
    });
    choseContent(dataPicked);
  }

  useEffect(() => {
    if (currentValue === undefined) {
      setError(true);
    }

    if (currentValue != undefined && typeof currentValue === 'object' && currentValue.id) {
      loadContentInfo(currentValue.id);
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    props.onChange(currentValue);
  }, [currentValue]);

  return useObserver(() => (
    <div css={{ marginBottom: 20 }}>
      <div css={{ display: 'flex', alignItems: 'center', width: '100%', minHeight: 40 }}>
        <p
          css={{
            lineHeigth: 1,
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--text-regular)',
            flexGrow: 1,
            margin: 0,
            display: 'block',
          }}
        >
          {key}
        </p>
      </div>
      {currentValue != undefined && componentInfo != undefined && (
        <Column>
          <div
            css={{ padding: 20, display: 'flex', alignItems: 'center', borderRadius: 4, border: 'var(--border)', width: '100%' }}
          >
            <div css={{ flex: 1 }}>{componentInfo.name}</div>

            <IconButton css={{ marginLeft: 15 }} aria-label="edit" size="small" onClick={openContentSelector}>
              <EditIcon />
            </IconButton>

            <IconButton css={{ marginLeft: 5 }} aria-label="delete" size="small" onClick={deleteReference}>
              <ClearIcon />
            </IconButton>
          </div>
        </Column>
      )}
      {currentValue == undefined && (
        <Column>
          <Button
            type="submit"
            css={{ marginTop: 10 }}
            color="primary"
            fullWidth
            variant="contained"
            onClick={openContentSelector}
          >
            <AddIcon fontSize="small" />
            Choose Entry
          </Button>
        </Column>
      )}
      {props.value.helperText && !error && (
        <span
          css={{
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: '1.375rem',
            color: 'oklch(from var(--text-primary) l c h / 60%)',
            marginTop: 8,
            display: 'block',
          }}
        >
          {props.value.helperText}
        </span>
      )}
      {
        error && (
          <span
            css={{
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: '1.375rem',
              color: 'var(--red)',
              marginTop: 8,
              display: 'block',
            }}
          >
            {errorMsg}
          </span>
        )
      }
    </div>
  ));
};
