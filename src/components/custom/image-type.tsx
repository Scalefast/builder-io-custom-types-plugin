/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useObserver } from 'mobx-react';
import { CustomValue, FormTypeProps } from '../../models';
import ApiService from '../../services/api.service';
import { InputLabel, IconButton } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import { camelCaseToHuman, Column } from '../../utils';
import { useEffect, useRef, useState } from 'react';
import { ImageSelector } from './image-selector/image-selector';

export const ImageType = (props: FormTypeProps) => {
  const apiService = new ApiService();
  const [currentValue, setCurrentValue] = useState<CustomValue | undefined>(props.currentValue);
  const [imageInfo, setImageInfo] = useState<any | undefined>(undefined);
  const isInitialRender = useRef(true);

  function choseContent(value: any) {
    setImageInfo(value);
    setCurrentValue(value.url);
  }

  async function openContentSelector() {
    const close = await props.context.globalState.openDialog(
      <ImageSelector
        context={props.context}
        onComplete={(value) => {
          choseContent(value);
          close();
        }}
      />,
    );
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    props.onChange(currentValue);
  }, [currentValue]);

  return useObserver(() => (
    <div>
      <InputLabel>{camelCaseToHuman(props.value.key)}</InputLabel>
      <Column css={{ marginTop: 10, marginBottom: 20 }}>
        <div
          css={{ padding: 20, display: 'flex', alignItems: 'center', borderRadius: 4, border: 'var(--border)', width: '100%' }}
        >
          {currentValue === undefined && (
            <IconButton css={{ marginRight: 25 }} aria-label="edit" onClick={openContentSelector}>
              <CloudUploadIcon />
            </IconButton>
          )}
          {currentValue !== undefined && typeof currentValue === 'string' && (
            <img
              css={{ marginRight: 25, width: 68, height: 68, objectFit: 'cover', objectPosition: 'center center' }}
              src={currentValue}
            />
          )}

          <div>
            {imageInfo !== undefined && (
              <div>
                <div css={{ fontSize: 12, marginBottom: 5 }}>{imageInfo.name}</div>
                <div css={{ fontSize: 12, marginBottom: 5 }}>
                  {imageInfo.width}x{imageInfo.height}
                </div>
              </div>
            )}
            <a css={{ flex: 1, fontSize: 14, color: 'var(--primary-color)' }} onClick={openContentSelector}>
              Choose Photo
            </a>
          </div>
        </div>
      </Column>
    </div>
  ));
};
