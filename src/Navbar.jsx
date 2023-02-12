import React from "react";
import DP from './images/dp.png'



export default function Navrbar(){
    return(

            <nav className="navbar navbar-expand-lg navbar-dark" id="navBar">

                <a className="navbar-brand" href="#" style={{fontWeight:'700',display:'flex'}}>
                    <img src={DP} width="50" height="50" className="d-inline-block align-middle icon" alt="" />
                    <span className="floating" style={{fontSize:'21px',fontWeight:'900',textAlign:'left'}}>Ghantasala arts</span>
                    </a>


                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse"  id="navbarNav" style={{margin: '1rem  0 1rem 5rem'}}>
                    <ul className="navbar-nav ms-auto" style={{marginRight:'1rem'}}>
                    <li className="nav-item active">
                        <a className="nav-link " href="#" >వాస్తు</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#" >జ్యోతిష్యం</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#">పూజలు</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#">వ్రతాలు</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#">హోమాలు</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#">జపాలు</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">జాతకం</a>
                    </li>
                    </ul>
                </div>



                </nav>
         

        
    )
}