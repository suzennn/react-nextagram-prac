import React from 'react';
import { Form, FormGroup, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import '../App.css';

class UploadImgModal extends React.Component {

    render() {
        const { showUploadModal, imageFile, previewImage, message } = this.props
        console.log(showUploadModal)
        return (
            <div>
                <Modal isOpen={showUploadModal} toggle={this.props.uploadImgModal}>
                    <ModalHeader toggle={this.props.uploadImgModal}>Upload an image</ModalHeader>
                    <Form className="d-flex flex-column justify-content-center align-items-center my-3" onSubmit={this.props.handleSubmit}>
                        <FormGroup>
                            <Input type="file" name="image-file" onChange={this.props.handleFile}/>
                            {/* <Label for="file" className="uploadFileBtn">choose a file</Label> */}
                            {/* <FormText color="muted">
                                Make sure the image uploaded
                                </FormText> */
                            }
                            <div className="card d-flex justify-content-center align-items-center mt-3">
                                {previewImage? (
                                    <img src={previewImage} width="300px" height="300px"/>
                                ):(
                                    <div height="300px" width="300px" className="bg-info text-center text-muted">
                                        {message? message: 'Live Preview'}
                                    </div>
                                )}
                            </div>
                        </FormGroup>
                        <Button type="submit" color="primary" disabled={!imageFile}>
                            Upload
                        </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default UploadImgModal;