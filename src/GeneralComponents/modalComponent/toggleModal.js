import React, { useState, useEffect } from 'react'
import Modal from './modal.component';
const useModal = (bool)=> {
    const [state, setState] = useState({isModalOpen: null});
    useEffect(() => {
        setState({isModalOpen: bool});
    }, [bool])
    const { isModalOpen } = state;
    return isModalOpen
}
const useModalState = (bool) => useModal(bool)

const ToggleModal = (event, Content, title) => {
    event.preventDefault();

    let bool = null;
    const target = event.target;
    console.log(target);
    const targetClassList = [...target.classList];
    console.log(targetClassList);
    targetClassList.includes('close') ? bool = false : bool = true;
    const isModalOpen = useModalState(bool)
     return (
        <Modal toggleModal = {'hi'} isModalOpen = {isModalOpen} contentTitle ={title} contentBody = {<Content />} />
     )
}
// const useModalState = (event) => {
//     event.preventDefault();
//     const target = event.target;
//     console.log(target);
//     const targetClassList = [...target.classList];
//     console.log(targetClassList);
   
//     return (
//         <Modal useModalState = {this.useModalState} isModalOpen = {state} contentTitle ="View Comments" contentBody = {<Comments />} />
//     )
// }
export default ToggleModal
