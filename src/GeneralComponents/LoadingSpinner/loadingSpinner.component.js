/* eslint-disable no-unused-expressions */
import React from 'react';
import { promiseTrackerHoc } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import './spinner.css';

const LoadingSpinner = (props) => {
    return props.promiseInProgress && (
        <div className="spinner">
          <Loader type="ThreeDots" color="#690483" height={100} width={100} />
        </div>
    )
}

export const Spinner = promiseTrackerHoc(LoadingSpinner);
