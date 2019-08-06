import React from 'react';
import axios from 'axios';
import Image from "react-graceful-image";

import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import UploadPage from './UploadPage';

class MyProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            myImgs: []
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtCode')}`
            }
        })
            .then(result => {
                console.log(result.data)
                this.setState({
                    isLoading: false,
                    myImgs: result.data
                })
            })
            .catch(error => {
                console.log('ERROR: ', error.result)
            })
    }

    addNewImg = (img) => {
        const {myImgs} = this.state
        const myImgsNew = [...myImgs]
        this.setState=({
            myImgs: myImgsNew.push(img)
        })
    }

    render() {
        const { isLoading } = this.state
        if (isLoading) {
            return (
                <>
                    <NavBar />
                    <Loader />
                </>
            )
        }

        if (this.state.myImgs.length == 0) {
            return (
                <>
                    <NavBar />
                    <div className="container bg-light">
                        <div className="row userDescr d-flex justify-content-center">
                            <div className="col-md-3">
                                <img className="userImg rounded-circle m-5 border-white" src={localStorage.getItem('dp')} />
                            </div>
                            <div className="col-md-9">
                                <h6 className="mt-5 pt-3 username">{localStorage.getItem('user')}</h6>
                                <div className="d-flex ml-4 mt-5 justify-content-start align-items-center">
                                    <UploadPage addNewImg={(img)=>this.addNewImg(img)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center my-auto">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                <p className="font-italic font-weight-light" style={{ color: 'gray', fontSize: '12px' }}>this user has not posted yet</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        return (
            <>
                <NavBar />
                <div className="container bg-light">
                    <div className="row userDescr d-flex justify-content-center">
                        <div className="col-md-3">
                            <img className="userImg rounded-circle m-5 border-white" src={localStorage.getItem('dp')} />
                        </div>
                        <div className="col-md-9">
                            <h6 className="mt-5 pt-3 username">{localStorage.getItem('user')}</h6>
                            <div className="d-flex ml-4 mt-5 justify-content-start align-items-center">
                                <UploadPage addNewImg={(img)=>this.addNewImg(img)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center my-auto">
                        <div className="d-flex flex-wrap justify-content-center align-items-start">
                            {
                                this.state.myImgs.map((image, index) => {
                                    return (
                                        <Image src={image} key={`myImg${index}`} alt={"photos"} className="userImgs rounded" retry={{ count: 10, delay: 2 }} />   /*retry loading images 10 times with 2 second delay between each try*/
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
export default MyProfilePage;
