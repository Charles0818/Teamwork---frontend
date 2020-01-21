import React, { useState } from 'react'
import Modal from './modal.component';

const useModal = (contentTitle, Comp, props) => {
    const [isModalOpen, setIsModaOpen] = useState(false);
    const closeModal = () => setIsModaOpen(false);
    const openModal = () => setIsModaOpen(true);
    const ModalChild = RenderModal(isModalOpen, closeModal, contentTitle, Comp, props)
    return { closeModal, openModal, isModalOpen, ModalChild }
}

const RenderModal = (isModalOpen, closeModal, contentTitle, Comp, props) => {
    return (
        <Modal closeModal = {closeModal} isModalOpen = {isModalOpen} contentTitle ={contentTitle} contentBody = { <Comp closeModal={closeModal} {...props} />} />
    )
}
 
export default useModal;
