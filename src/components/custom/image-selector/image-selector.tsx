/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import ApiService from '../../../services/api.service';
import { CustomApplicationContext } from '../../../models';
import { useObserver } from 'mobx-react';
import CustomModal from '../../../utils/modal/modal';
import './image-selector.css';
import { CenterRow } from '../../../utils';
import { Button } from '@material-ui/core';

type ModelSelectorProps = {
  context: CustomApplicationContext;
  onComplete(e: any): void;
};

export const ImageSelector = (props: ModelSelectorProps) => {
  const { context } = props;
  const apiService = new ApiService();
  const [assets, setAssets] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [haveMoreAssets, setHaveMoreAssets] = useState<boolean>(true);
  const limit = 20;

  async function getContentModels(offset: number) {
    const params = `query.type.$regex=image&cachebust=1&offset=${offset}&noTraverse=true&limit=${limit}`;
    const fetchedAssets = await apiService.queryAssets(context, params);
    let result = Array.isArray(fetchedAssets.results) ? fetchedAssets.results : [];
    setAssets((prevValue) => {
      return prevValue.concat(result);
    });

    if (result.length == 0) {
      setHaveMoreAssets(false);
    }
  }

  function selectContent(content: any): void {
    props.onComplete(content);
  }

  function loadNextContent(): void {
    const offset = page * limit;
    setPage((preValue) => preValue + 1);
    getContentModels(offset);
  }

  useEffect(() => {
    getContentModels(0);
  }, []);

  return useObserver(() => (
    <CustomModal>
      <div css={{ marginBottom: 20, paddingRight: 10, paddingLeft: 10, fontSize: 24 }}>Content</div>
      <div className="esw-content">
        <div className="esw-grid">
          {assets.map((row) => (
            <div className="esw-image-container" onClick={() => selectContent(row)}>
              <div className="esw-image-src">
                <img src={row.url} />
              </div>
              <div className="esw-image-info">
                <div className="esw-image-name">{row.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {haveMoreAssets && (
        <CenterRow>
          <Button
            css={{ marginTop: 15, marginBottom: 10, minWidth: 200}}
            type="submit"
            color="primary"
            variant="contained"
            aria-label="load more"
            size="small"
            onClick={() => loadNextContent()}
          >
            <span>Load more</span>
          </Button>
        </CenterRow>
      )}
    </CustomModal>
  ));
};
