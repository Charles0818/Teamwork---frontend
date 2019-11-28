import React, { Component } from 'react';

import CreateArticle from './article.component';
import CreateGif from './gif.component';
import { UserConsumer } from '../../context/userContext';

class CreateContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeComp: 'article'
    }
  }
  setArticleForm = () => {
    this.setState({
      activeComp: 'article'
    })
  }
  setGIF = () => {
    this.setState({
      activeComp: 'gif'
    })
  }

  render() {
    const { activeComp } = this.state;
    console.log(activeComp);
    return ( 
      <UserConsumer>
        {({data: {token, userId}}) => (
          <div>
            <div>
              <div className="control--btns position-relative margin-bottom-md">
                <span type = "article" onClick={() => this.setArticleForm()}
                  className={`accordion--btn font-weight-600 ${(activeComp === 'article') ? 'active' : ''} margin-right-sm`}>Article
                </span>
                <span type = "gif" onClick={() => this.setGIF()}
                  className={`accordion--btn font-weight-600 ${(activeComp === 'gif') ? 'active' : ''} margin-right-sm `}>GIF
                </span>
              </div>
              <h3 className="modal--heading">{activeComp === 'article' ? 'Write an article' : 'Share GIF'}</h3>
            </div>
            <div>
              {
                (activeComp === 'gif') ? (
                  <CreateGif userData={{token, userId}} />
                ) : (
                  <CreateArticle userData={{token, userId}} />
                )
              }
            </div>
          </div>
        )}
        
      </UserConsumer>
    );
  }
}

export default CreateContent;