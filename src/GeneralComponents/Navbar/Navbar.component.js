import React, { Component } from 'react';
import '../FormComponent/form.css';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <header>
                <nav className="top--navbar d-flex align-items--center justify-content--s-between">
                    <a className="favicon" href="#">
                        <span className="paint-text italic font-lg">T</span>
                        <span className="font-sm">eam</span>
                        <span className="paint-text italic font-lg">W</span>
                        <span className="font-sm">ork</span>
                    </a>

                    <div className="search-box">
                        <input type="search" placeholder="Search article" />
                        <i className="fas fa-search font-md padding-md"></i>
                    </div>

                    <ul className="nav--icons d-flex align-items--center">
                        <li className="nav-icon padding-md icon position-relative">
                            <i className="fas fa-bell"></i>
                            <span className="">6</span>
                        </li>
                        <li className="nav-icon padding-md icon border-line--v"><i className="far fa-comments"></i></li>
                        <li className="nav-icon padding-md icon border-line--v">
                            <img className="avatar--sm" 
                            src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1566505654/IMG_20190615_134638_qex57k.jpg"
                            alt="your avatar" />
                        </li>
                       
                    </ul>
                </nav>
            </header>
         );
    }
}
 
export default Navbar;