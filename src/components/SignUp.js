import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, Form, Label, Input } from 'reactstrap';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            pwd: '',
            confirmPwd: '',
            isValid: false
        };
        this.timer = null
        this.timeremail = null
        this.timerpwd = null
        this.timerconfirmpwd = null
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.pwd
            }
        })
            .then(response => {
                console.log(response)
                alert('It works!')
                this.props.toggleModal()
            })
            .catch(error => {
                console.log(error.response)
                alert('Something went wrong!')
            })
        // this.setState({
        //     username: '',
        //     email: '',
        //     pwd: '',
        //     confirmPwd: '',
        //     modal: !this.state.modal
        // })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    checkUsername = username => {
        axios(`https://insta.nextacademy.com/api/v1/users/check_name?username=${username}`)
            .then(result => {

                this.setState({
                    isValid: result.data.valid
                })
            })
    }

    getInputProp = () => {
        const { isValid, username } = this.state
        if (username.length > 4) {
            if (isValid) {
                return { valid: true }
            } else {
                return { invalid: true }
            }
        } else {
            return {}
        }
    }

    handleUsernameInput = e => {
        clearTimeout(this.timer)
        const { value } = e.target
        this.setState({
            username: value
        })
        this.timer = setTimeout(() => {
            this.checkUsername(value)
        }, 500)
    }

    getEmailProp = () => {
        const {email} = this.state
        const check = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (email.length < 6) {
            return {}
        } else if (check.test(email)) {
            return {valid: true}
        } else {
            return {invalid: true}
        }
    }

    handleEmailInput = e => {
        clearTimeout(this.timeremail)
        const {value} = e.target
        this.setState({
            email: value
        })
        this.timeremail = setTimeout(()=>{
            this.getEmailProp()
        },2000)
    }

    getPwdProp = () => {
        const { pwd } = this.state
        if (pwd.length == 0 && pwd.length < 8){
            return {}
        } else if (pwd.length >= 8) {
            return { valid: true }
        } else {
            return { invalid: true }
        }
    }

    handlePwdInput = e => {
        clearTimeout(this.timerpwd)
        const { value } = e.target
        this.setState({
            pwd: value
        })
        this.timerpwd = setTimeout(() => {
            this.getPwdProp()
        }, 2000)
    }

    getConfirmPwdProp = () => {
        const {confirmPwd, pwd} = this.state
        if (pwd.length == 0) {
            return {}
        } else if (pwd == confirmPwd) {
            return {valid: true}
        } else {
            return {invalid: true}
        }
    }

    handleConfirmPwdInput = e => {
        clearTimeout(this.timerconfirmpwd)
        const { value } = e.target
        this.setState({
            confirmPwd: value
        })
        this.timerconfirmpwd = setTimeout(() => {
            this.getConfirmPwdProp()
        }, 2000)
    }

    render() {
        const { username, isValid, pwd, confirmPwd, email } = this.state
        const check = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        return (
            <div>
                <ModalBody>
                    <Form onSubmit = {this.handleSubmit}>
                        <div className="md-form mb-4">
                            <Label data-error="wrong" data-success="right">Username</Label>
                            <Input {...this.getInputProp()} onChange={this.handleUsernameInput} value={this.state.username}
                                type="text" id="username" className="form-control validate" placeholder="username must be at least 5 characters" />
                            <FormFeedback {...this.getInputProp()}>
                                {username.length > 4 ?
                                    isValid ? "Username is available! :)" : "Sorry, this username is taken! :("
                                    : "Username has insufficient character count"}
                            </FormFeedback>
                        </div>
                        <div className="md-form mb-4">
                            <Label data-error="wrong" data-success="right">Email</Label>
                            <Input {...this.getEmailProp()} onChange={this.handleEmailInput} value={this.state.email}
                                type="email" id="email" className="form-control validate" placeholder="please enter a valid email address" />
                            <FormFeedback {...this.getEmailProp()}>
                                {check.test(email)? "":"Email address is not valid"}
                            </FormFeedback>
                        </div>
                        <div className="md-form mb-4">
                            <Label data-error="wrong" data-success="right">Password</Label>
                            <Input {...this.getPwdProp()} onChange={this.handlePwdInput} value={this.state.pwd}
                                type="password" id="pwd" className="form-control validate" placeholder="password must be at least 8 characters" />
                            <FormFeedback {...this.getPwdProp()}>
                                {pwd.length >= 8 ? "Password is ok!" : "Password does not meet minimum requirements. It must be at least 8 characters"}
                            </FormFeedback>
                        </div>
                        <div className="md-form mb-4">
                            <Label data-error="wrong" data-success="right">Confirm Password</Label>
                            <Input {...this.getConfirmPwdProp()} onChange={this.handleConfirmPwdInput} value={this.state.confirmPwd}
                                type="password" id="confirmPwd" className="form-control validate" placeholder="confirm your password" />
                            <FormFeedback {...this.getConfirmPwdProp()}>
                                {pwd!=confirmPwd && "Password and password confirmation fields do not match :("}
                            </FormFeedback>
                        </div>
                    </Form>
                    <div className="d-inline-flex">Already a member? <a href='#' onClick={this.props.toggleForm}>Login here</a></div>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                    <Button color="info" onClick={this.handleSubmit} disabled={!this.state.username.length || !this.state.email.length || !this.state.pwd.length || (this.state.pwd != this.state.confirmPwd)}>SIGN UP</Button>
                </ModalFooter>
            </div>
        );
    }
}
export default SignUp;


