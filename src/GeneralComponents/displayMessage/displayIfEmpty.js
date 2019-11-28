import React from 'react';
export const displayIfEmpty = (message) => {
    return (
      <div className="d-flex justify-content--center align-items--center" style={{position: 'absolute',
      top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <span className="font-lg gray-color font-weight-600">{message}</span>
      </div>
    )
}