import { height } from "@mui/system";
import React from "react";

export default function Footer(){

    let  year = new Date();
    let currentYear = year.getFullYear();



    return(
    <footer className=" text-center text-lg-start " style={{marginTop:'50px',backgroundColor:'rgba(41, 40, 40, 0.6)'}} >
  <div className="text-center p-3" style={{ color:'white'}}>
    © {currentYear} Copyright | 
    <a className="text-light" href="#" style={{textDecoration:'none', fontWeight:500}}> Ghantasala Arts </a>
  </div>
</footer>
    )
}