// import { height } from "@mui/system";
import React from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';

export default function Footer(){

    let  year = new Date();
    let currentYear = year.getFullYear();



    return(
    <footer className=" text-center text-lg-start " style={{marginTop:'50px',backgroundColor:'rgba(41, 40, 40, 0.6)', paddingBottom:'20px'}} >
  <div className="text-center p-3" style={{ color:'grey'}}>

  <div style={{margin:"10px 0"}}>
  <a  href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " style={{textDecoration:'none'}}><WhatsAppIcon className="socialIcon" style={{color:'green',marginRight:'10px',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
     <a  href="tel:+919490478707" style={{textDecoration:'none'}}><CallIcon className="socialIcon" style={{color:'#537FE7',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
     </div>

    © {currentYear} Copyright  
    <a className="footerTitle" href="/" style={{textDecoration:'none', fontWeight:500,color:'yellow'}}> | Ghantasala Arts |</a>
    </div>
    </footer>
    )
}