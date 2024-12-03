/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import ApiService from '../../../services/api.service';
import { CustomApplicationContext } from '../../../models';
import { useObserver } from 'mobx-react';
import CustomModal from '../../../utils/modal/modal';
import './model-selector.css';

type ModelSelectorProps = {
  context: CustomApplicationContext;
  modelId: string;
  onComplete(e: any): void;
};

export const ModelSelector = (props: ModelSelectorProps) => {
  const { context } = props;
  const apiService = new ApiService();
  const [content, setContent] = useState<any[]>([]);

  async function getContentModels() {
    // TODO: add pagination
    const params = `query.published=published&limit=50&cachebust=true&offset=0&listing=true&sort.priority=1`;
    const fetchedComps = await apiService.queryContent(props.modelId, context, params);
    let result = Array.isArray(fetchedComps.results) ? fetchedComps.results : [];
    setContent(result);
  }

  function selectContent(content: any): void {
    props.onComplete(content);
  }

  useEffect(() => {
    getContentModels();
  }, []);

  return useObserver(() => (
    <CustomModal>
      <div css={{ marginBottom: 20, paddingRight: 10, paddingLeft: 10, fontSize: 24 }}>Content</div>
      <div className="esw-table-container">
        <table className="esw-table" aria-label="simple table">
          <thead className="esw-table-head">
            <tr className="esw-table-row">
              <th className="esw-th" css={{ textAlign: 'left', minWidth: '200', padding: '4px 0 4px 24px' }}>
                Name
              </th>
              <th className="esw-th" css={{ textAlign: 'right', minWidth: '100', padding: '4px 10px 4px 24px' }}>
                Id
              </th>
            </tr>
          </thead>
        </table>
        <div className="esw-content">
          {content.map((row) => (
            <div className="esw-row" onClick={() => selectContent(row) }>
              <div className="esw-row-container">
                <div className="esw-row-one">{row.name}</div>
                <div className="esw-row-two">{row.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomModal>
  ));
};
