import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = (props) => {
  const { handleInput, value } = props;
  return (
    <form className="form d-flex position-relative" style={{width: '100%'}}>
      <textarea className="textarea padding-md padding-bottom-lg padding-right-lg font-md margin-bottom-sm"
        onChange={(event) => handleInput(event)} name="comment"
        value={value} placeholder="Write Comment">
      </textarea>
      {props.button && props.action ? (
        <i className="fas fa-paper-plane color2 font-lg"
        style={{position: 'absolute', bottom: '20px', right: '25px'}}
        onClick={(event) => props.action(event)}
      />
      ) : null}
  </form>
  )
}

CommentForm.propTypes = {
  action: PropTypes.func,
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  button: PropTypes.bool
}

CommentForm.defaultProps = {
  button: true
}

export default CommentForm;