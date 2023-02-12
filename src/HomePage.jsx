import React, { useState } from "react";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import Cards from "./Cards";
import Navrbar from "./Navbar";
// import FormCollect from "./FormCollect";
import useSound from 'use-sound'
import Om from '../src/images/sounds/bgMusic.mp3'
import TestCards from "./TestCards";




export default function HomePage()
{
    // const song = new Audio("bgMusic.mp3");

    const [play] = useSound(Om)
    const [stop] = useSound(Om,{volume:0})

    


    // const song = new Audio("bgMusic.mp3");
    // song.play();

    const [click,setClick] =useState(true);
    
     function tog(){
        if(click){
            setClick(false)
            stop()
        }else{
            setClick(true)
            play()

        }
    }
   
    return(
        <div className="Home " style={{paddingBottom:'50px'}} onLoad={play}>
            {/* <audio id="audio" loop autoPlay> 
                <source src="bgMusic.mp3" type="audio/mp3" />
            </audio> */}
            <Navrbar/>

            <div className="row container-fluid" >
                <div className="col-11"></div>
                <div className="col" style={{margin:'20px',color:'whitesmoke'}}>
                    
                {/* <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" checked />
                <label className="custom-control-label" for="customSwitch1"></label>
                </div> */}
                {click ? <VolumeUpIcon style={{cursor:"pointer"}} onClick={() => {tog();}}/> : <VolumeOffIcon style={{cursor:"pointer"}} onClick={() => { tog();}}/>}

                </div>
                <TestCards/>
                {/* <Cards/> */}
                <div style={{}}>
                {/* <FormCollect/> */}
                </div>
            </div>

            
            {/* <button >play</button> */}
            {/* <button onClick={() => {song.pause();}}>pause</button> */}
            
        </div>
    )
}