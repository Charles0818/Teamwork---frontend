import React, { Component } from 'react';

import CreateArticle from './article.component';
import CreateGif from './gif.component';

class CreateContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeComp: 'article'
    }
  }

  toggleForm = (event) => {
    const target = event.target;
    const { type } = target.attributes;
    console.log(type);
    this.setState({
      activeComp: type === 'article' ? 'article' : 'gif'
    })
  }
  render() {
    const { activeComp } = this.state;
    console.log(activeComp);
    return ( 
      <div>
        <div>
          <div className="control--btns">
            <span type = "article" onClick={(event) => this.toggleForm(event)}
              className={`accordion--btn ${(activeComp === 'article') ? 'active' : ''} padding-sm margin-right-sm`}>Article
            </span>
            <span type = "gif" onClick={(event) => this.toggleForm(event)}
              className={`accordion--btn ${(activeComp === 'gif') ? 'active' : ''} padding-sm`}>GIF
            </span>
          </div>
          <h3 className="modal--heading margin-left-md">{activeComp === 'article' ? 'Write your story' : 'Share GIF'}</h3>
        </div>
        <div>
          {
            (activeComp === 'article') ? (
              <CreateArticle />
            ) : (
              <CreateGif />
            )
          }
        </div>
      </div>
    );
  }
}

export default CreateContent;