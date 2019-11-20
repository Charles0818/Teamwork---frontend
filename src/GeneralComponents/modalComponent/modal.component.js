import React, { Component } from 'react';
import { createPortal } from "react-dom";
import './modal.style.css';

const modalRoot = document.querySelector('#modal');
const root = document.querySelector('#root');

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalOpen: this.props.isModalOpen
         }
    }
    render() {
        (this.props.isModalOpen) ? (
            root.classList.add('modalRoot')) : (
                root.classList.remove('modalRoot')
            )
        return (
            <div className={`modal--box ${this.props.isModalOpen ? "active" : ""}`}>
                <div className="d-flex justify-content--s-between position-relative">
                    <div className="modal-content--btn">
                    {this.props.contentBtn ? this.props.contentBtn : null}
                    </div>
                    <i className="fas fa-times close font-md" onClick={ (event)=> this.props.toggleModal(event)}></i>
                </div>
                <div className="content-wrapper">
                    <h4 className="modal--heading">{this.props.contentTitle}</h4>
                        {this.props.contentBody}
                </div>
            </div>
         );
    }
}

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalOpen: !this.props.isModalOpen
         }
         this.modalDiv = document.createElement('div')
         this.modalDiv.classList.add('modal--wrapper')
    }

    componentDidMount(){
        modalRoot.appendChild(this.modalDiv);
    }

    componentWillUnmount(){
        modalRoot.removeChild(this.modalDiv);
    }

    render() {
        const {isModalOpen} = this.state
        const ex = ()=> {
            console.log(isModalOpen)
        };

        ex()
        
        return (
            createPortal(<ModalContent {...this.props} />, this.modalDiv)
         );
    }
}
 
export default Modal;
