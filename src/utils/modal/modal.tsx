/** @jsx jsx */
import { jsx } from '@emotion/core';
import './modal.css';

type CustomModalProps = {
  children: any
}

const CustomModal = (props: CustomModalProps) => {
  const { children } = props;

  return (
    <div className="esw-modal">
      <div className="esw-dialog">
        <div className="esw-dialog-body">
          <div className="esw-modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
