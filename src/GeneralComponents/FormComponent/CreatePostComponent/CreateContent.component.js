import React, { useState, useContext } from 'react';
import CreateArticle from './article.component';
import CreateGif from './gif.component';
import { UserContext } from '../../context/userContext';

const CreateContent = (props) =>  {
  const { closeModal } = props;
  const [activeComp, setActiveComp] = useState('article');
  const { data: { token, userId } } = useContext(UserContext)
  const setComp = (comp) => setActiveComp(comp);
  console.log(activeComp);
  return ( 
    <div>
      <div>
        <div className="control--btns position-relative margin-bottom-md">
          <span onClick={() => setComp('article')}
            className={`accordion--btn font-weight-600 ${(activeComp === 'article') ? 'active' : ''} margin-right-sm`}>Article
          </span>
          <span onClick={() => setComp('gif')}
            className={`accordion--btn font-weight-600 ${(activeComp === 'gif') ? 'active' : ''} margin-right-sm `}>GIF
          </span>
        </div>
        <h3 className="modal--heading">{activeComp === 'article' ? 'Write an article' : 'Share GIF'}</h3>
      </div>
      <div>
        {
          (activeComp === 'gif') ? (
            <CreateGif userData={{token, userId}} closeModal={closeModal} />
          ) : (
            <CreateArticle userData={{token, userId}} closeModal={closeModal} />
          )
        }
      </div>
    </div>
  );
}

export default CreateContent;