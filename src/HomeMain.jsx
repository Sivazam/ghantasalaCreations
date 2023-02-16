import {React, useState} from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import useSound from 'use-sound'
import Om from '../src/images/sounds/bgMusic.mp3'
import TestCards from "./TestCards";
import OwnQuetion from "./OwnQuestion";


export default function HomeMain(){

    // const song = new Audio("bgMusic.mp3");

    const [play,{stop}] = useSound(Om)



    // play();
    // const [stop] = useSound("")



    // const song = new Audio("bgMusic.mp3");
    // song.play();

    const [click,setClick] =useState(true);
    
     function tog(){
        if(click){
            setClick(false);
            stop()

        }else{
            setClick(true);
            play()


        }
    }


    return(
    <div>
        
        <div className="row" style={{marginRight:'0px'}} onLoad={play}>
                {/* <div className="col-11"></div> */}
                <div className="col" style={{margin:'20px 0px 0px 20px',color:'whitesmoke'}}>
                    
                {/* <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" checked />
                <label className="custom-control-label" for="customSwitch1"></label>
                </div> */}
                <span style={{display:'flex', margin:'5px'}}>
                {/* {click ? <VolumeUpIcon style={{cursor:"pointer",color:'green', background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => {tog();}}/> : <VolumeOffIcon style={{cursor:"pointer",color:'red',background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => { tog();}}/>} */}
                <a  href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " style={{textDecoration:'none'}}><WhatsAppIcon className="socialIcon" style={{color:'green',margin:'0 10px',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
                <a  href="tel:+919490478707" style={{textDecoration:'none'}}><CallIcon className="socialIcon" style={{color:'#537FE7',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
                </span>
                </div>
                {/* <div className="row"> */}
                {/* <div className="col-3"></div> */}
                {/* <div className="col"> */}
                <div class="jumbotron jumbotron-fluid" style={{marginTop:'8px'}}>
                    <div class="container">
                        <h1 class="display-4" style={{color:'white'}}></h1>
                        <p class="lead mainText"style={{color:'white'}}><FormatQuoteIcon className="mainText"/> మీరు బలంగా సంకల్పిస్తే ఏదైనా సాధించగలరు సమస్యే లేదు <FormatQuoteIcon className="mainText"/></p>
                    </div>
                {/* </div> */}
                {/* </div> */}
                {/* <div className="col-3"></div> */}
                </div>

                {/* <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4" style={{color:'white'}}></h1>
    <p class="lead mainText"style={{color:'white'}}><FormatQuoteIcon className="mainText"/> మీరు బలంగా సంకల్పిస్తే ఏదైనా సాధించగలరు సమస్యే లేదు <FormatQuoteIcon className="mainText"/></p>
  </div>
</div> */}
                <TestCards/>
             
            </div>
    </div>)
}