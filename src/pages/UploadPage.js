import React from 'react';
import { Form, FormGroup, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadImgModal from '../components/UploadImgModal';
import axios from 'axios';

class UploadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageFile: null,
            previewImage: null,
            showUploadModal: false,
            message: ''
        }
    }

    uploadImgModal = () => {
        this.setState({
            showUploadModal: !this.state.showUploadModal
        })

        if (this.state.showUploadModal == false) {
            this.setState({
                previewImage: null,
                imageFile: null
            })
        }
    }

    handleFile = e => {
        this.setState({
            imageFile: e.target.files[0],
            previewImage: URL.createObjectURL(e.target.files[0])
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("image", this.state.imageFile)
        console.log(formData)
        // formData.append("caption,...")               //if want to append caption
        axios.post('https://insta.nextacademy.com/api/v1/images/', formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtCode')}` }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.success) {
                    this.setState({
                        message: "Image uploaded successfully!",
                        previewImage: null,
                        imageFile: null
                    })
                    this.props.addNewImg(response.data.image_url)
                }
            })
            .catch(error => {
                console.log(error.response);
            })
        
    }

    render() {
        // console.log(this.state.showUploadModal)
        return (
            <div>
                <Button type="submit" color="primary" onClick={this.uploadImgModal}>Upload an image</Button>

                {
                    this.state.showUploadModal &&
                    <UploadImgModal
                        uploadImgModal={this.uploadImgModal}
                        showUploadModal={this.state.showUploadModal}
                        imageFile={this.state.imageFile}
                        handleFile={this.handleFile}
                        previewImage={this.state.previewImage}
                        isLoading={this.state.isLoading}
                        message={this.state.message}
                        handleSubmit={this.handleSubmit}
                        isLoading = {this.props.isLoading}
                    />
                }
            </div>
        )
    }
}

export default UploadPage;