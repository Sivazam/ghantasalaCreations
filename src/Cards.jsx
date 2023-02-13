import React from "react";
import qna from './Questions'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import useSound from 'use-sound';
import Bell from "./images/sounds/bell.mp3"

export default function Cards(){
    // var bell = new Audio("bell.mp3");

    // const start = () => {
    //     bell.play()
    //   }

      const  [play] = useSound(Bell,{volume:0.25})

    return(
        <div className="container-fluid  mainContainer ">
            <div className="row lm90">
                {qna.map((x,i) => {
                    return (<>
                     <div className="col-xl-5 col-md-12  col-sm-12 col-xs-12 card-main" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={play} key={i} id={i} >
                        <h4 className="mainText" style={{fontWeight:800}} key={i}>{x.question}</h4>

                        
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" key={x.id} >
                        <div className="modal-dialog modal-dialog-centered" >
                            <div className="modal-content" style={{background: "grey"}} id={i} key={i}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"></h5>
                                <button style={{border:"none", background:'none'}} type="button" className="" data-bs-dismiss="modal" aria-label="Close"><CloseOutlinedIcon style={{color:'red',background:"none"}}/></button>
                            </div>
                            
                            <div className="modal-body" id={i} key={i.id} >
                                <h4 className="mainText" style={{fontWeight:800}} >{x.question}</h4>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button> */}
                                <button type="button" className="btn btn-success">మీరు సమాధానం తెలుసుకోవాలనుకుంటున్నారా</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                

                </>)
                })}
               
         

            </div>

          
        </div>
    )
}