import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../FormComponent/form.css';
import { UserContext } from '../context/userContext';

class Navbar extends Component {
  constructor(props) {
      super(props);
      this.state = {  }
  }

  static contextType = UserContext

  componentDidMount() {
    const navbar = document.querySelector('.top--navbar');
    window.addEventListener('scroll', () => {
      (window.scrollY > 0) ? (
        navbar.classList.add('sticky_nav')
      ) : navbar.classList.remove('sticky_nav')
    })
  }

  componentWillUnmount() {
    const navbar = document.querySelector('.top--navbar');
    window.removeEventListener('scroll', () => {
      (window.scrollY > 0) ? (
        navbar.classList.add('sticky_nav')
      ) : navbar.classList.remove('sticky_nav')
    })
  }

  renderNavLink = (accountType, path) => {
    if (accountType === 'admin') {
       return (path === '/admin') ? (
          <Link to={{pathname: '/user/dashboard'}}>
            <li className="cursor-pointer padding-md margin-right-md">
              <i className="fas fa-newspaper font-lg"></i>
            </li>
          </Link>
        ) : (
          <Link to={{pathname: '/admin/dashboard'}}>
            <li className="cursor-pointer padding-md margin-right-md">
              <i className="fas fa-user-shield font-lg"></i>
            </li>
          </Link>
        )
    }else return null
  }

  render() {
    const { data: { accountType, photoDetails } } = this.context
    const { path } = this.props.match;
    return ( 
      <header className="margin-bottom-md" style={{marginBottom: '80px'}}>
        <nav className="top--navbar d-flex align-items--center justify-content--s-between position-relative">
            <Link to="/" className="favicon color2 cursor-pointer">
                <span className="paint-text italic font-lg">T</span>
                <span className="font-sm">eam</span>
                <span className="paint-text italic font-lg">W</span>
                <span className="font-sm">ork</span>
            </Link>

            {path === '/admin' ? null : (
              <div className="search-box">
                <input type="search" placeholder="Search by category"
                  className="font-sm text-align-center font-weight-600" />
                <i className="fas fa-search font-md padding-md"></i>
              </div>
            )}
            
            <ul className="d-flex align-items--center">
              {
                this.renderNavLink(accountType, path)
              }
              <li className="cursor-pointer padding-md icon">
                <Link to="/user/profile">
                  <div className="avatar--sm">
                    <img className="" 
                    src={photoDetails[0]}
                    alt="your avatar" />
                  </div>
                </Link>
              </li>
            </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;