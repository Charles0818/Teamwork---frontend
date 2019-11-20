import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="margin-bottom-sm border-line--h">
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
                <div className="comment-content margin-bottom-sm">
                    <div className="text-content padding-bottom-sm">
                        <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                            printer took a gallery of type and scrambled it to make a type specimen book. It has survived not 
                            only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing. 
                        </p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Comment;