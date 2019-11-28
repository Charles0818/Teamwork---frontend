import React, { Component } from 'react';
export class DisplayMessageTop extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="d-flex justify-content--center padding-md border-r-10 bckgr-white color-success" style={{position: 'fixed', top: '0'}}>
                <div className="d-flex align-self-end">
                    <i className="fas fa-good font-lg margin-right-md"></i>
                    <span className="font-lg">{this.props.message}</span>
                </div>
            </div>
         );
    }
}