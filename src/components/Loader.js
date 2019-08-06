import React from 'react';
import '../App.css';
import loading from '../loading_icon.svg';

// class Loader extends React.Component {
//     render(){
//         return(
//             <div className="d-flex justify-content-center align-items-center w-100 h-100 mt-5">
//                 <img style={{ height: '50px', width: '50px' }} src={loading} alt="loading..."></img>
//             </div>
//         )
//     }
// }

const Loader = (props) => (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 mt-5">
            <img style={{ height: '50px', width: '50px' }} src={loading} alt="loading..."></img>
        </div>       
)
export default Loader
