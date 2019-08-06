import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../App.css';

import ImageContainer from '../containers/ImageContainer';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';

class HomePage extends React.Component {
  state = {
    users: [],
    isLoading: true
  }

  componentDidMount() {
    // performing a GET request
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        // If successful, we do stuffs with 'result'
        const users = result.data
        this.setState({
          users,
          isLoading: false
        })
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
      })
  }

  render() {
    const { users, isLoading } = this.state
    if (isLoading) {
      return (
        <>
          <NavBar />
          <Loader />
        </>
      )
    }

    return (
      <div>
        <NavBar/>
        {
          this.state.users.map(user =>
            <ul className='row m-4 py-4 bg-light border' key={user.id}>
              <li className="card bg-light border-0 col-md-3 col-sm-12 userInfo">
                <div className="username pl-3">{user.username} </div>
                <div className="d-flex justify-content-center">
                  <img className="userImg rounded-circle mt-3" src={user.profileImage} alt={`${user.username} profile pic}`} />
                </div>
                  <Link to={`/users/${user.id}`} className="d-flex justify-content-center text-decoration-none">
                  <button className="btn bg-primary text-white m-5">See More</button>
                  </Link>
              </li>
              <div className="col-md-9 col-sm-12 d-flex justify-content-center align-items-center">
                <ImageContainer id={user.id} />
              </div>
            </ul>
          )
        }
      </div>
    )
  }

}
export default HomePage;