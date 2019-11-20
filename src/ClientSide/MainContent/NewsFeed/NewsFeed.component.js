import React, { Component } from 'react';

import Article from './Article.component';
import Modal from '../../../GeneralComponents/modalComponent/modal.component';
import CreateContent from '../../../GeneralComponents/FormComponent/CreatePostComponent/CreateContent.component';
class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalOpen: false
         }
    }

    toggleModal = (event)=> {
        event.preventDefault();
        const target = event.target;
        console.log(target);
        const targetClassList = [...target.classList];
        console.log(targetClassList);
        (targetClassList.includes('close')) ? (
          this.setState({isModalOpen: false })
          ) : (
            this.setState({ isModalOpen: true})
            )
        console.log(this.state.isModalOpen);
    }


    render() { 
        return ( 
            <div>
                <div className="create--post">
                    <i className="fas fa-plus-circle font-xlg action" onClick={(event) => this.toggleModal(event)}></i>
                </div>
                <section className="news-feed">
                    <Article />
                    <Article />
                </section>
                <Modal toggleModal = {this.toggleModal} isModalOpen = {this.state.isModalOpen} contentTitle ="" contentBody = {<CreateContent />} />
            </div>

            // The article comp should have an object props holding the article data
         );
    }
}
 
export default NewsFeed;