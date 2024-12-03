/** @jsx jsx */
import { jsx } from '@emotion/core';
import { CustomValue, FormTypeProps } from '../../models';
import { useObserver } from 'mobx-react';
import { camelCaseToHuman, Column } from '../../utils';
import { Button, IconButton, InputLabel } from '@material-ui/core';
import { Add as AddIcon, Clear as ClearIcon, Edit as EditIcon } from '@material-ui/icons';
import { ModelSelector } from './model-selector/model-selector';
import { useEffect, useRef, useState } from 'react';
import ApiService from '../../services/api.service';

export const ReferenceType = (props: FormTypeProps) => {
  const apiService = new ApiService();
  let modelId = '';
  let modelName = '';
  const [currentValue, setCurrentValue] = useState<CustomValue | undefined>(props.currentValue);
  const [componentInfo, setComponentInfo] = useState<Record<string, any> | undefined>(undefined);
  const isInitialRender = useRef(true);

  if (props.value.extraOptions) {
    modelId = props.value.extraOptions.modelId;
    modelName = props.value.extraOptions.modelName;
  }

  async function loadContentInfo(contentId: string): Promise<void> {
    const params = `query.published.$eq=published&limit=50&cachebust=true&fields=name,id`;
    const result = await apiService.getContent(modelName, contentId, props.context, params);
    setComponentInfo(result);
  }

  function choseContent(value: any) {
    setCurrentValue({
      "@type": "@builder.io/core:Reference",
      "id": value.id,
      "model": modelName
    });
  }

  function deleteReference() {
    setCurrentValue(undefined);
  }

  async function openContentSelector() {
    const close = await props.context.globalState.openDialog(
      <ModelSelector
        context={props.context}
        onComplete={(value) => {
          choseContent(value);
          close();
        }}
        modelId={modelId}
      />
    );
  }

  useEffect(() => {
    if (currentValue != undefined && typeof currentValue === "object" && currentValue.id) {
      loadContentInfo(currentValue.id);
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    props.onChange(currentValue);
  }, [currentValue]);

  return useObserver(() => (
    <div>
      <InputLabel>{ camelCaseToHuman(props.value.key) }</InputLabel>
      { (currentValue != undefined && componentInfo != undefined) &&
        <Column css={{ marginTop: 10, marginBottom: 20 }}>
          <div css={{ padding: 20, display: 'flex', alignItems: 'center', borderRadius: 4, border: 'var(--border)', width: '100%' }}>
            <div css={{ flex: 1 }}>
              { componentInfo.name }
            </div>

            <IconButton css={{ marginLeft: 15 }} aria-label="edit" size="small" onClick={openContentSelector}>
              <EditIcon />
            </IconButton>

            <IconButton css={{ marginLeft: 5 }} aria-label="delete" size="small" onClick={deleteReference}>
              <ClearIcon />
            </IconButton>
          </div>
        </Column>
      }
      {
        currentValue == undefined &&
          <Column css={{ marginTop: 5, marginBottom: 10 }}>
            <Button
              type="submit"
              css={{ marginTop: 10 }}
              color="primary"
              fullWidth
              variant="contained"
              onClick={openContentSelector}
            >
              <AddIcon fontSize='small' />
              Choose Entry
            </Button>
          </Column>
      }
    </div>
  ));
}
