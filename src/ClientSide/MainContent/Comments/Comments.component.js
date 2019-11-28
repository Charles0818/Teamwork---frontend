import React, { Component } from 'react';
import Comment from './Comment.component';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="comment--section">
                <Comment />
                <Comment />
                <Comment />
                <form className="form d-flex position-relative" style={{width: '100%'}}>
                    <textarea className="textarea padding-md padding-bottom-lg padding-right-lg font-md margin-bottom-sm" placeholder="Post Comment"></textarea>
                    <i className="fas fa-paper-plane color2 font-lg"
                        style={{position: 'absolute', bottom: '20px', right: '25px'}}>
                    </i>
                </form>
            </div>
         );
    }
}
 
export default Comments;