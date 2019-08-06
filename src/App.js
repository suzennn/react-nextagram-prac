import React from 'react';
import {Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './pages/MyProfilePage';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={HomePage} />
        <Route path = "/users/:id" component={UserProfilePage} />
        <Route exact path="/profile" component={MyProfilePage} />
      </>
    )
  }

}
export default App;