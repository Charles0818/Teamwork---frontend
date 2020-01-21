import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './message.style.css';
const modalRoot = document.querySelector('#modal');

export const Message = (props) => {
 const [effect, setEffect] = useState(false);
 useEffect(() => setEffect(true),[])
  const { status } = props;
  return (
    <div className={`d-flex justify-content--center httpStatus
      ${effect ? 'active' : ''} padding-lg border-r-10 bckgr-white
      ${status === 'success' ? 'success-text' : 'danger-text'}`}>
      <div className={`d-flex align-self-end ${status === 'success' ? 'success-text' : 'danger-text'}`}>
        <i className={`fas fa-check font-lg margin-right-md ${status === 'success' ? 'success-text' : 'danger-text'}`}></i>
        <span className={`font-lg ${status === 'success' ? 'success-text' : 'danger-text'}`}>{props.message}</span>
      </div>
    </div>
  );
}

const DisplayHttpStatus = (props) => {
  useEffect(() => {
    modalRoot.appendChild(modalDiv);
    const interval = setTimeout(() => {
      modalRoot.removeChild(modalDiv)
    }, 3000);
    return () =>  clearTimeout(interval)
  })
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal--wrapper');

    return (
      createPortal(<Message {...props} />, modalDiv)
    );
}

export default DisplayHttpStatus;

export const useHttpStatus = () => {
  const [ajaxStatus, setAjaxStatus] = useState({show: false, message: '', status: ''});
  const updateAjaxStatus = (props) => {
    const { show, message, status } = props;
    setAjaxStatus({show, message, status});
    const timeout = setTimeout(() => {
      setAjaxStatus({show: false, message: '', status: ''});
    }, 3500);
    return () => clearTimeout(timeout)
  };
  const HttpStatusComponent = ajaxStatus.show &&
    <DisplayHttpStatus status={ajaxStatus.status} message={ajaxStatus.message} />
  return { ajaxStatus, updateAjaxStatus, HttpStatusComponent }
}