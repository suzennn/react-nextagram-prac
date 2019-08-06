import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';
import ModalOpen from './ModalOpen';

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      isLogin: false,
      isLoggedIn : false
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  toggleForm = () => {
    this.setState({
      isLogin: !this.state.isLogin
    })
  }

  // toggleLogin = () => {
  //   this.setState({
  //     isLoggedIn : !this.state.isLoggedIn
  //   })
  // }
  toggleLogin = () => {
    if (localStorage.length==0){
      this.setState({
        isLoggedIn: false
      })
    } else {
      this.setState({
        isLoggedIn: true
      })
    }
  }
  handleLogout = () => {
    localStorage.removeItem('jwtCode')
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    localStorage.removeItem('dp')
    alert('You have been logged out')
    this.toggleModal()
    this.toggleLogin()
}

  isLoginModal = () => {
    this.setState({
      isLogin: true
    })
  }
  ifLoginModal = () => {
    this.toggleModal()
    this.isLoginModal()
  }

  isSignUpModal = () => {
    this.setState({
      isLogin: false
    })
  }
  ifSignUpModal = () => {
    this.toggleModal()
    this.isSignUpModal()
  }

  componentDidMount() {
    this.toggleLogin()
  }

  render() {
    const {showModal} = this.state
    return (
      <nav className="navbar navbar-expand-md navbar-light sticky-top d-inline-flex flex-nowrap justify-content-between w-100">
        <Link to="/" className="text-decoration-none">
          <div className="d-inline-flex flex-nowrap">
            <img className="logo" src='http://www.transparentpng.com/thumb/logo-instagram/JFyofc-logo-instagram-background-png.png' />
            <h2>| <span className="title">Nextagram</span></h2>
          </div>
        </Link>
        <div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Type username" aria-label="Search" />
              <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
            </form>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to ="/profile" className="nav-link" href="#">User</Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" onClick={this.ifLoginModal}>{this.state.isLoggedIn? 'Logout':'Login'}</a> */}
                {this.state.isLoggedIn?
                  <Link to="/" className="nav-link" onClick={this.handleLogout}>Logout</Link>
                  :
                  <a className="nav-link" onClick={this.ifLoginModal}>Login</a>
                }
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={this.ifSignUpModal}>Sign Up</a>
                  </li>
                </ul>
              </div>
          {showModal && 
            <ModalOpen 
              toggleForm={this.toggleForm} 
              showModal={this.state.showModal} 
              toggleModal={this.toggleModal} 
              isLogin ={this.state.isLogin}
              isLoggedIn = {this.state.isLoggedIn}
              toggleLogin = {this.toggleLogin}
          />}
          </div>
          </nav>
        )
    }
}
export default NavBar