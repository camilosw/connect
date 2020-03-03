import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'astroturf';

const cn = css`
  .modalContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }
  .modal {
    background-color: #fff;
    z-index: 1100;
  }
`;

interface Props {
  children: React.ReactNode;
  onHide(): void;
}

const Modal = ({ onHide, children }: Props) => {
  const modal = (
    <div className={cn.modalContainer}>
      <div className={cn.background} onClick={onHide} />
      <div className={cn.modal}>{children}</div>
    </div>
  );

  const element = document.getElementById('modal');

  if (element) {
    return ReactDOM.createPortal(modal, element);
  }
  return null;
};

export default Modal;
