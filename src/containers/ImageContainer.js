import React from 'react';
import axios from 'axios';
import Image from "react-graceful-image";
import MiniLoader from "../components/MiniLoader";

export default class ImageContainer extends React.Component {
    state = {
        images: [],
        isLoading: true
    }

    componentDidMount() {
        axios("https://insta.nextacademy.com/api/v1/images?userId=" + this.props.id)
            .then(resp => {
                let images = resp.data
                this.setState({
                    images: this.props.showAll ? images : images.slice(0,3),            //by default image array only takes first true items unless all={true}//
                    isLoading: false
                })
            })
    }

    render() {
        const { images, isLoading } = this.state
        if (isLoading) {
            return (
                <div className="d-flex justify-content-center align-item-center">
                    <MiniLoader />
                </div>
            )
        }
        if (this.state.images.length == 0) {
            return(
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    <p className="font-italic font-weight-light" style={{color:'gray',fontSize:'12px'}}>this user has not posted yet</p>
                </div>
            )
        }
        return (
            <div className="d-flex flex-wrap justify-content-center align-items-start">
                {
                    this.state.images.map((image, index) => {
                        return (
                            <Image src={image} key={`${this.props.id}+${index}`} alt={"photos"} className="userImgs rounded" retry={{ count: 10, delay: 2 }} />   /*retry loading images 10 times with 2 second delay between each try*/
                        )
                    })
                }
            </div>
        )
    }

}