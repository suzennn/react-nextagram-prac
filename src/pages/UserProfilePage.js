import React from 'react';
import '../App.css';
import axios from 'axios';
import ImageContainer from "../containers/ImageContainer";
import NavBar from "../components/NavBar";

class UserProfilePage extends React.Component {
    constructor(props){
        super(props)
        this.state={
            user:[]
        }
    }

    componentDidMount() {
        const {id}=this.props.match.params
        axios.get("https://insta.nextacademy.com/api/v1/users/"+id)
            .then(resp=>{
                const user=resp.data
                this.setState({user})
            })
    }

    render() {
        const { id } = this.props.match.params
        const {user} = this.state
        return (
            <>
                <NavBar />
                <div className="container bg-light">
                    <div className="row userDescr d-flex justify-content-center">
                        <div className="col-md-3">
                            <img className="userImg rounded-circle m-5 border-white" src={user.profileImage}/>
                        </div>
                        <div className="col-md-9">
                            <h6 className="mt-5 pt-3 username">{user.username}</h6>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center my-auto">
                        <ImageContainer showAll={true} id={id}/>
                    </div>
                </div>
            </>
        )
    }
}

export default UserProfilePage
