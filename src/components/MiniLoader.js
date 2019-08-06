import React from 'react';
import '../App.css';
import loading from '../loading_icon.svg';

// class MiniLoader extends React.Component {
//     render(){
//         return(
//             <div className="d-flex justify-content-center align-items-center w-100 h-100">
//                 <img style={{ height: '30px', width: '30px' }} src={loading} alt="loading..."></img>
//             </div>
//         )
//     }
// }
const MiniLoader = (props) => (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <img style={{ height: '30px', width: '30px' }} src={loading} alt="loading..."></img>
    </div>
)
export default MiniLoader