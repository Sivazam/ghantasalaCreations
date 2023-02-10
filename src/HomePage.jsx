import React, { useState } from "react";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Cards from "./Cards";
export default function HomePage()
{

    const song = new Audio("bgMusic.mp3");
    song.play();

    const [click,setClick] =useState(true);
    
     function tog(){
        if(click){
            setClick(false)
        }else{
            setClick(true)
        }
    }
   
    return(
        <div className="Home container-fluid">
            {/* <audio id="audio" loop autoPlay> 
                <source src="bgMusic.mp3" type="audio/mp3" />
            </audio> */}
            <div className="row">
                <div className="col-11"></div>
                <div className="col" style={{margin:'20px',color:'whitesmoke'}}>
                {click ? <VolumeUpIcon style={{cursor:"pointer"}} onClick={() => {tog();}}/> : <VolumeOffIcon style={{cursor:"pointer"}} onClick={() => { tog();}}/>}

                </div>

                <Cards/>
            </div>

            
            {/* <button >play</button> */}
            {/* <button onClick={() => {song.pause();}}>pause</button> */}
            
        </div>
    )
}