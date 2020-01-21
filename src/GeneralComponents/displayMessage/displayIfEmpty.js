import React from 'react';
export const displayIfEmpty = (message) => {
    return (
      <div className="d-flex justify-content--center align-items--center">
        <span className="font-lg gray-color font-weight-600">{message}</span>
      </div>
    )
}