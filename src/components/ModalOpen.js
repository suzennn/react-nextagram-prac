 import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import SignUp from './SignUp';
import Login from './Login';

class ModalOpen extends React.Component {

    render() {
        return (
            <div>
                <Modal isOpen={this.props.showModal} toggle={this.props.toggleModal}>
                    <ModalHeader toggle={this.props.toggleModal}>{this.props.isLogin? this.props.isLoggedIn? "Logout":"Login":"Sign Up"}</ModalHeader>
                    {this.props.isLogin? 
                        <Login 
                            toggleForm={this.props.toggleForm} 
                            isLogin={this.props.isLogin} 
                            toggleModal={this.props.toggleModal} 
                            isLoggedIn={this.props.isLoggedIn} 
                            toggleLogin={this.props.toggleLogin}
                        /> 
                        : 
                        <SignUp 
                            toggleForm={this.props.toggleForm} 
                            isLogin={this.props.isLogin} 
                            toggleModal={this.props.toggleModal}
                        />
                    }
                </Modal>
            </div>
        );
    }
}
export default ModalOpen;