import React from "react";
import { Link } from "react-router-dom";
import DP from './images/dp.png'



export default function Navrbar(){

    
    return(

            <nav className="navbar navbar-expand-lg navbar-dark " id="navBar" >
                <span className="container-fluid">
                <Link className="navbar-brand" to="/" style={{fontWeight:'700',display:'flex'}}>
                    <img src={DP} width="50" height="50" className="d-inline-block align-middle icon" href="/" alt="" />
                    <span className="floating" style={{fontSize:'21px',fontWeight:'900',textAlign:'left'}}>Ghantasala arts</span>
                    </Link>


                <button className="navbar-toggler"  type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse"  id="navbarNav" style={{margin: '1rem  0 1rem 5rem'}}>
                    <ul className="navbar-nav ms-auto" style={{marginRight:'1rem'}}>
                    <li className="nav-item active ">
                        <a className="nav-link " href="#"> <button className="btn btn-ouline-danger" onClick={() => alert("Coming soon")}  style={{color:'white', border:'1px solid yellow'}}>వాస్తు</button></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#" onClick={() => alert("Coming soon")} ><button className="btn btn-ouline-danger" style={{color:'white', border:'1px solid yellow'}}>జ్యోతిష్యం</button></a>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link disabled" href="#" onClick={() => alert("Coming soon")}><button className="btn btn-danger" style={{color:'yellow', border:'1px solid grey'}}>పూజలు</button></a> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#" onClick={() => alert("Coming soon")}><button className="btn btn-ouline-danger" style={{color:'white', border:'1px solid yellow'}}>పూజలు</button></a>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link " href="#" onClick={() => alert("Coming soon")}><button className="btn btn-ouline-danger" style={{color:'white', border:'1px solid yellow'}}>హోమాలు</button></a> */}
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link " href="#" onClick={() => alert("Coming soon")}><button className="btn btn-ouline-danger" style={{color:'yellow', border:'1px solid yellow'}}>జపాలు</button></a>
                    </li>  */}
                    <li className="nav-item">
                        <a className="nav-link " href="/nakshatras"><button className="btn btn-ouline-danger" style={{color:'white', border:'1px solid yellow'}}>వివాహం</button></a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link " href="/projects"><button className="btn btn-ouline-danger" style={{color:'white', border:'1px solid yellow'}}>ప్రాజెక్టులు</button></a>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link disabled" href="#" onClick={() => alert("Coming soon")}><button className="btn btn-danger" style={{color:'yellow', border:'1px solid yellow'}}>జాతకం</button></a> */}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/gallery" ><button className="btn btn-outine-danger" style={{color:'white', border:'1px solid yellow'}}>ఫొటో గ్యాలరీ</button></Link>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link disabled" href="#" onClick={() => alert("Coming soon")}><button className="btn btn-danger" style={{color:'yellow', border:'1px solid yellow'}}>ఘంటసాల గీత</button></a> */}
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link " href="#" onClick={() => alert("Coming soon")}><button className="btn btn-ouline-danger" style={{color:'yellow', border:'1px solid yellow'}}>చిట్టి తంత్రాలు</button></a>
                    </li> */}
                    {/* <li className="nav-item">
                        <a className="nav-link " href="#" onClick={() => alert("Coming soon")}><button className="btn btn-ouline-danger" style={{color:'white', border:'1px solid yellow'}}>ధనాకర్షణ రెమిడీలు</button></a>
                    </li> */}
                                  {/* <a href="https://forms.gle/EXvB63qU2aLG9b668">  <button className='btn btn-warning' style={{margin:'10px 0px',padding:'10px',fontFamily:'monospace',fontWeight:700,border:'2px white solid'}}>Register now for Summer BootCamp</button></a> */}

                    </ul>
                </div>

                </span>

                </nav>
         

        
    )
}