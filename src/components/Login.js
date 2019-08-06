import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                username: this.state.username,
                password : this.state.pwd
            }
        })
        .then(response =>{
            // console.log(response)
            alert('You have successfully logged in')
            localStorage.setItem('jwtCode',response.data.auth_token)
            localStorage.setItem('user',response.data.user.username)
            localStorage.setItem('id',response.data.user.id)
            localStorage.setItem('dp',response.data.user.profile_picture)
            this.props.toggleModal()
            this.props.toggleLogin()
        })
        .catch(error =>{
            console.log(error.response)
            alert('Something went wrong. Unsuccessful login')
        })
        // this.setState({
        //     username: '',
        //     pwd: ''
        // })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
        // !this.props.isLoggedIn?
            <div>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup className="md-form mb-4">
                            <Label data-error="wrong" data-success="right">Username</Label>
                            <Input onChange={this.handleInput} value={this.state.username}
                                type="text" id="username" className="form-control validate" placeholder="your username" />
                        </FormGroup>
                        <FormGroup className="md-form mb-4">
                            <Label data-error="wrong" data-success="right">Password</Label>
                            <Input onChange={this.handleInput} value={this.state.pwd}
                                type="password" id="pwd" className="form-control validate" placeholder="your password" />
                        </FormGroup>
                    </Form>
                    <div className="d-inline-flex">
                        New member?
                            <a href="#" onClick={this.props.toggleForm}>
                            Sign Up here    
                            </a>
                    </div>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                    <Button color="info" onClick={this.handleSubmit} disabled={!this.state.username.length || !this.state.pwd.length}>LOGIN</Button>
                </ModalFooter>
            </div>
            // :
            // <div>
            //     <ModalBody className="d-flex flex-column justify-content-between align-items-center">
            //         <div>Are you sure? :(</div>
            //         <Button color="danger" onClick={this.handleLogout} className="mt-3">Yes</Button>
            //         <img src='https://media.tenor.com/images/52340a5eeef3aa8fc88402e242b97e13/tenor.gif' />
            //     </ModalBody>
            // </div>
        );
    }
}
export default Login;

//Note: to log out



