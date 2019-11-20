import React, { Component } from 'react';
import './sidebar.style.css';
class RightSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <aside className="thread">
                <div className="aside right">
                    <div className="padding-top-lg">
                    <div className="accordion">
                        <div className="accordion--btn d-flex justify-content--center">
                            <button className="btn margin-right-sm">Online</button>
                            <button className="btn">Colleagues</button>
                        </div>
                        <div className="content-wrapper">
                                <ul className="online--users">
                                    <li className="user d-flex align-items--center margin-bottom-md nowrap action">
                                        <div className="position-relative">
                                            <img className="avatar--sm icon" src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1566505654/IMG_20190615_134638_qex57k.jpg" alt="poster avatar" />
                                            <span className="online"></span>
                                        </div>
                                        <span className="font-sm username">Charles Omoregie</span>
                                    </li>
                                    <li className="user d-flex align-items--center margin-bottom-md nowrap action">
                                        <div className="position-relative">
                                            <img className="avatar--sm icon" src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1566505654/IMG_20190615_134638_qex57k.jpg" alt="poster avatar" />
                                            <span className="online"></span>
                                        </div>
                                        <span className="font-sm username">Charles Omoregie</span>
                                    </li>
                                    <li className="user d-flex align-items--center margin-bottom-md nowrap action">
                                        <div className="position-relative">
                                            <img className="avatar--sm icon" src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1566505654/IMG_20190615_134638_qex57k.jpg" alt="poster avatar" />
                                            <span className="online"></span>
                                        </div>
                                        <span className="font-sm username">Charles Omoregie</span>
                                    </li>
                                </ul>
                                <ul className="users--list">
                                    <li className="user d-flex justify-content--s-between align-items--center margin-bottom-md nowrap action">
                                        <div className="position-relative">
                                            <img className="avatar--sm icon" src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1566505654/IMG_20190615_134638_qex57k.jpg" alt="poster avatar" />
                                            <span className="font-sm username">Charles Omoregie</span>
                                        </div>
                                        <i className="far fa-comments"></i>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </aside>
         );
    }
}
 
export default RightSidebar;