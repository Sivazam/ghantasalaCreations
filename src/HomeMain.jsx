import {React, useEffect, useState} from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import useSound from 'use-sound'
import Om from '../src/images/sounds/bgMusic.mp3'
import TestCards from "./TestCards";
import OwnQuetion from "./OwnQuestion";
import { Propane } from '@mui/icons-material';
import Footer from './Footer';
import Navrbar from './Navbar';
import shiva from "../src/images/gallery/lingam.png";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import times from "lodash/times";
import { update } from 'lodash';
import Tables from './Tables';


export default function HomeMain(prop){

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

    function Notifiy(){

        alert(`*** లేటెస్ట్ అప్‌డేట్‌లు - 30/3/2023 ***\n\n * ప్రాజెక్టులు మరియు వివాహానికి సరిపడ నక్షత్రములు, వెబ్‌పేజీలను వెబ్‌సైట్‌కి జోడించారు\n\n * ఇప్పుడు మీరు టాప్ మెనుని ఉపయోగించి వాటిని సందర్శించవచ్చు` )
    }

useEffect(()=>{
    setTimeout(()=>{Notifiy()},7000)
 },[])
    


    return(
    <div className={prop.cName} style={{marginBottom:'0px'}} >
                    <Navrbar/>

        
        <div className="row" style={{marginRight:'0px',paddingRight:'0px'}}>
                {/* <div className="col-11"></div> */}
                <div className="col" style={{margin:'20px 0px',color:'whitesmoke'}}>
                    
                {/* <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" checked />
                <label className="custom-control-label" for="customSwitch1"></label>
                </div> */}
                <span style={{display:'flex', margin:'5px'}}>
                {/* {click ? <VolumeUpIcon style={{cursor:"pointer",color:'green', background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => {tog();}}/> : <VolumeOffIcon style={{cursor:"pointer",color:'red',background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => { tog();}}/>} */}
                <a  href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " style={{textDecoration:'none'}}><WhatsAppIcon className="socialIcon" style={{color:'green',margin:'0 10px',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
                <a  href="tel:+919490478707" style={{textDecoration:'none'}}><CallIcon className="socialIcon" style={{color:'#537FE7',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
                </span>



                    <div style={{margin:'20px 0'}}>
                        {/* <marquee loop="infinite" behavior="scroll" direction="left" onMouseOver="this.stop()" onMouseOut="this.start()"><a href="/gallery"  style={{textDecoration:'none'}}><h3 className="mainText add"> <img src={shiva} alt="" height={'100px'} />  మహా శివ రాత్రి మహోత్సవం అప్‌డేట్ - 2023  <img src={shiva} alt="" height={'100px'} /> </h3></a></marquee> */}
                   
{/*                    
<div style={{ height: "100px" }}>
  <Marquee velocity={12} minScale={0.7} resetAfterTries={200} >
     {times(5, Number).map((id) => (
      
      <div>
          <a href="/gallery"  style={{textDecoration:'none'}}><h3 className="mainText add"> <img src={shiva} alt="" height={'100px'} /> శ్రీ మహా శివ రాత్రి మహోత్సవం అప్‌డేట్ - 2023 </h3></a>      
      </div>
    ))}
  </Marquee>
</div> */}


                    </div>




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
                <Footer/>

            </div>

            {/* <Tables/> */}
    </div>)
}