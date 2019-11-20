import React, { Component } from 'react';
import Modal from '../../../GeneralComponents/modalComponent/modal.component';
import Comments from '../Comments/Comments.component';

class GIF extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <article className="story page-container cursor-pointer">
                <div className="margin-bottom-sm">
                    <div className="d-flex justify-content--s-between align-items--center margin-bottom-sm">
                        <div className="poster--details">
                            <img className="avatar--sm icon" 
                            src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1566505654/IMG_20190615_134638_qex57k.jpg"
                             alt="poster avatar" />
                            <span className="poster--username">Username</span>
                        </div>
                        <div className="flag-stats ">
                            <i class="fas fa-flag margin-right-sm cursor-pointer danger-text"></i>
                            <span className="flag font-weight-bold padding-sm danger-bckgr color-white border-r-circle">5</span>
                        </div>
                    </div>
                    <div className="post-time margin-bottom-sm">
                        <span>2 hrs ago</span>
                    </div>
                </div>
                <div className="post-content margin-bottom-sm">
                    <div className="text-content padding-bottom-sm">
                        <img src="" alt="" />
                        <span className='padding-sm paint-text font-weight-bold'>...View Full Size</span>
                    </div>
                </div>
                <div className="comment--flag--section">
                    <div className="stats d-flex justify-content--s-between align-items--center margin-bottom-sm
                        padding-bottom-sm">
                        <div className="comment-stats font-weight-bold cursor-pointer">
                            <i className="fas fa-comments margin-right-sm paint-text"></i>
                            <span className="value comment icon">5</span> 
                        </div>
                        <div className="action padding-sm" id="add--comment"
                            style={{border: '1px solid #a0a0a0', borderRadius: '10px', justifySelf: 'flex-end'}}
                            onClick={(event) => this.toggleModal(event)}>
                            <i className="fas fa-comment icon color2"></i>
                            <span className="font-weight-bold">Comment</span>
                        </div>
                    </div>
                </div>
                <Modal toggleModal = {this.toggleModal} isModalOpen = {this.state.isModalOpen} contentTitle ="View Comments" contentBody = {<Comments />} />
            </article>
         );
    }
}
 
export default GIF;