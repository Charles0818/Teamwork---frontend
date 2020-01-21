import React, { Component, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from "react-dom";
import './modal.style.css';

const modalRoot = document.querySelector('#modal');

const ModalContent = (props) => {
  const { isModalOpen, closeModal } = props;
 
  return (
    <div className={isModalOpen ? 'modalRoot' : ''}>
      <div className={`modal--box ${isModalOpen ? "active" : ""}`}>
        <div className="d-flex justify-content--s-between position-relative">
          <div className="modal-content--btn">
          {props.contentBtn ? props.contentBtn : null}
          </div>
          <i className="fas fa-times close font-md" onClick={closeModal}></i>
          {/* <FontAwesomeIcon icon="times" className="close font-md" onClick={closeModal} /> */}
        </div>
        <div className="content-wrapper">
          <h4 className="modal--heading">{props.contentTitle}</h4>
            {props.contentBody}
        </div>
      </div>
    </div>
  );
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
    this.modalDiv = document.createElement('div');
    this.modalDiv.classList.add('modal--wrapper');
  }

  componentDidMount(){
    modalRoot.appendChild(this.modalDiv);
  }

  componentWillUnmount(){
    modalRoot.removeChild(this.modalDiv);
  }

  render() {
    return (
      createPortal(<ModalContent {...this.props} />, this.modalDiv)
    );
  }
}

export default Modal;
