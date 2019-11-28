import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ToggleModal from '../../../GeneralComponents/modalComponent/toggleModal';
import Modal from '../../../GeneralComponents/modalComponent/modal.component';
import Comments from '../Comments/Comments.component';
import { FindUsername } from '../../../GeneralComponents/context/findUsername';
import { UsersContext } from '../../../GeneralComponents/context/usersContext';
import meme from '../../../Assets/images/meme.gif';
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
      }
  }

  static contextType = UsersContext;

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

  checkIfUserFlagged = (flagStats, userId) => {
    return flagStats.find(arr => userId === arr.userId)
  }

    
  contentType = (type, id, content, title) => {
    switch(type) {
      case 'article' :
        return (
          <div className="text-content padding-bottom-sm">
            <p className="gif-title font-weight-bold font-lg padding-bottom-md">
              {title}
            </p>
            <p style={{overflowY: 'hidden', maxHeight: '150px'}}>{content[0]}</p>
            <Link to={`/articles/${id}`}>
              <span className='padding-sm paint-text font-weight-bold'>...Read More</span>
            </Link>
          </div>
        )
      case 'gif' :
        return (
          <div className="padding-bottom-sm">
            <p className="gif-title font-weight-bold font-lg padding-bottom-md">
              {title}
            </p>
            <div className="d-flex justify-content--center align-items--center padding-bottom-md">
              <div className="" style={{width: '70%', height: '150px', overflow: 'hidden'}}>
                <img className="" style={{width: '100%', height: 'auto'}}
                  src={content[0]} publicId = {content[1]}
                  alt="poster avatar"
                />
              </div>
            </div>
            <Link to={`/gifs/${id}`}>
              <span className='padding-md paint-text font-weight-bold'>...View full size</span>
            </Link>
          </div>
        )
        // break;
      default:
        break;
    }
  }

  render() {
    let { users } = this.context;
    users = users.map(user => {
      const { employeeId, photoDetails, firstName, lastName } = user;
      return { employeeId, photoDetails, firstName, lastName }
    });
    const { id, title, category, content, userid: authorId, type, flagStat, comments } = this.props.feed;
    const author = users.find(user => parseInt(user.employeeId, 10) === authorId);
    const { photoDetails, firstName, lastName } = author;
    let { createdon: createdOn } = this.props.feed
    const { userId } = this.props.userData;

    return ( 
      <article className="story margin-bottom-md cursor-pointer">
        {authorId === userId ? (
          <div className="d-flex" style={{justifyContent: 'flex-end'}}>
            <div className="padding-bottom-sm trigger-more-action cursor-pointer position-relative">
              <i className="fas fa-ellipsis-h font-md font-weight-bold color-dark tooltip"></i>
              <div className="more-option padding-md border-r-10">
                <div className="d-flex align-items-end font-weight-bold margin-bottom-sm padding-bottom-xsm border-line--h">
                  <i className="fas fa-trash font-sm padding-right-sm"></i>
                  <span className="font-sm">Delete {type === 'article' ? 'article' : 'GIF'}</span>
                </div>
                <div className="d-flex align-items-end font-weight-bold padding-bottom-xsm">
                  <i className="fas fa-pen font-sm padding-right-sm"></i>
                  <span className="font-sm">Edit {type === 'article' ? 'article' : 'GIF'}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="margin-bottom-sm">
          <div className="d-flex justify-content--s-between align-items--center margin-bottom-sm">
            <div className="poster--details">
              <img className="avatar--sm icon" 
              src={photoDetails[0]}
                alt="poster avatar" />
              <span className="poster--username">{`${firstName} ${lastName}`}</span>
            </div>
            <div className="flag-stats ">
              <i className={`fas fa-flag margin-right-sm cursor-pointer ${'danger-text'}`}></i>
              <span className="flag font-weight-bold font-md padding-sm danger-text border-r-circle">{flagStat.length}</span>
            </div>
          </div>
          <div className="post-time margin-bottom-sm">
            <span>{createdOn}</span>
          </div>
        </div>
        <div className="post-content margin-bottom-sm">
          {this.contentType(type, id, content, title)}
        </div>
        <div className="category">
          <div className="">
            {category.map((el, index) => {
               return <span key={index} className="border-r-10 font-sm font-weight-500 bckgr-color2 color-white padding-sm margin-right-sm margin-bottom-sm">{el}</span>
            })}
          </div>
        </div>
        <div className="comment--flag--section">
          <div className="stats d-flex justify-content--s-between align-items--center margin-bottom-sm
            padding-bottom-sm">
            <div className="comment-stats font-weight-bold cursor-pointer">
              <i className="fas fa-comments margin-right-sm paint-text"></i>
              <span className="value comment icon">{comments.length}</span> 
            </div>
            <div className="action padding-sm" id="add--comment"
              style={{border: '1px solid #a0a0a0', borderRadius: '10px', justifySelf: 'flex-end'}}
              >
              <i className="fas fa-comment icon color2"></i>
              <span className="font-weight-bold">Comment</span>
            </div>
          </div>
        </div>
        <Modal toggleModal = {this.toggleModal} isModalOpen = {this.state.isModalOpen} contentTitle ="View Comments" contentBody = {<Comments comments={comments} feedId={id} users={users} />} />
      </article>
    );
  }
}

export default Content;