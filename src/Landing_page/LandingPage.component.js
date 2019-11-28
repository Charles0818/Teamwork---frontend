import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//components
import Modal from '../GeneralComponents/modalComponent/modal.component';
import { UserConsumer } from '../GeneralComponents/context/userContext';
import Login from '../GeneralComponents/FormComponent/login.component';
import './landingPage.styles.css';
// const { isModalOpen } = toggleModal();

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isModalOpen: false
    }
  }

  toggleModal = (event)=> {
      event.preventDefault();
      const target = event.target;
      console.log(target);
      const targetClassList = [...target.classList];
      console.log(targetClassList);
      (targetClassList.includes('close')) ? (
        this.setState({isModalOpen: false })
        ) : (
          this.setState({ isModalOpen: true})
          )
      console.log(this.state.isModalOpen);
  }

  render() {
    const {isModalOpen} = this.state;
    console.log(isModalOpen);
    return (
      <header className="landingPage-header page-padding">
        <nav className="padding-top-sm d-flex align-items--center justify-content--s-between">
          <Link to="/">
            <div className="favicon color-white">
                <span className="italic font-lg">T</span>
                <span className="font-sm">eam</span>
                <span className="italic font-lg">W</span>
                <span className="font-sm">ork</span>
            </div>
          </Link>
          <ul className="d-flex align-items--center">
            <li className=" margin-right-sm">
              <Link to="/about" className="color-white font-md font-weight-bold nav-link">About</Link>
            </li>
            <li className=" margin-right-sm">
              <Link to="/about" className="color-white font-md font-weight-bold nav-link">Contact Us</Link>
            </li>
            <li className=" margin-right-sm">
              <Link to="/about" className="color-white font-md font-weight-bold nav-link">Privacy</Link>
            </li>
            <li className=" margin-right-sm">
              <Link to="/about" className="color-white font-md font-weight-bold nav-link">About</Link>
            </li>
            <li className=" margin-right-sm">
              <Link to="/about" className="color-white font-md font-weight-bold nav-link">About</Link>
            </li>
          </ul>
          <div className="d-inline-block btn" onClick ={(event)=> this.toggleModal(event)}>Sign in Here</div>
        </nav>
        <div className="d-flex align-items--center justify-content--s-between margin-top-lg">
          <div className="desc color-white">
            <div className="padding-bottom-md">
              <h1 className="font-xlg padding-bottom-md">How enterprises deliver better digital experiences</h1>
              <p className="font-md text-content">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                  aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit.
              </p>
            </div>
            <div className="d-inline-block btn" onClick ={(event)=> this.toggleModal(event)}>Sign in Here</div>
          </div>
          <div className="desc d-flex align-items--center">
            <img src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/avatar-2191932_1280-removebg-preview_wqs7ev.png"
            alt="" style={{width: '100%', height: 'auto'}}/>
            <div className="bckgr-white border-r-10 padding-md" style={{width: '100%', height: 'auto'}}>
              <p className="font-md text-content color2 font-weight-600" style={{fontStyle: 'italic'}}>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit.
              </p>
            </div>
          </div>
        </div>
        <UserConsumer>
          {({updateAccount}) => (
            <Modal toggleModal = {this.toggleModal} isModalOpen = {isModalOpen} contentTitle =" Sign in" contentBody = {<Login updateAccount={updateAccount} />} />
          )}
        </UserConsumer>
      </header>
    );
  }
}

export default LandingPage;