import React, { Component } from 'react';
const ConfirmAction = (message, props) => {

    return ( 
    <div class="d-flex justify-content--center align-items--center" style={{position: 'fixed'}}>
        <div className="font-md">
        {message}
        </div>
        <div className="options">
        <div onClick={()=> this.props.action} className="btn">Yes</div>
        <div className="btn close">No</div>
        </div>
    </div>
    );
}

export default ConfirmAction