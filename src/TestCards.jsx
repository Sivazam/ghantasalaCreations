import React, { useState } from "react";
import qna from './Questions'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import useSound from 'use-sound';
import Bell from "./images/sounds/bell.mp3"
import FormCollect from "./FormCollect";

export default function TestCards(){
    // var bell = new Audio("bell.mp3");

    // const start = () => {
    //     bell.play()
    //   }

      const  [play] = useSound(Bell,{volume:0.25})


      const [select,setSelect] = useState("");
      const [click,setClick] = useState(false)
    //   const [question,setQuestion] = useState("")

      function handleSelect(e){
        setSelect(e.target.innerText);
        console.log(e)
        console.log(e.target)
        console.log(e.target.value)
        play();
      }

      function q(){
        setClick(true)
      }

    return(
        <div className="container-fluid  mainContainer ">
            <div className="row lm90">
                {qna.map((x,i) => {
                    return (<>
                     <div className="col-xl-5 col-md-12  col-sm-12 col-xs-12 card-main" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleSelect} key={i} >
                        <h4 className="mainText" style={{fontWeight:800}} key={i}>{x.question}</h4>
                    </div>
                    </>)
                })}

                        
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                        <div className="modal-dialog modal-dialog-centered" >
                            <div className="modal-content" style={{background: "none"}} >
                      {click ? <FormCollect question={select}/> : 
                      
                            <><div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"></h5>
                                <button style={{border:"none", background:'none'}} type="button" className="" data-bs-dismiss="modal" aria-label="Close"><CloseOutlinedIcon style={{color:'red',background:"none"}}/></button>
                            </div>
                            
                            <div className="modal-body"  >
                                <h4 className="mainText" style={{fontWeight:800}} >{select}</h4>
                            </div>
                            <div className="modal-footer" style={{textAlign:'center',justifyContent:'center'}}>
                                {/* <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button> */}
                                <button type="button" className="btn btn-success" onClick={q} >మీరు సమాధానం తెలుసుకోవాలనుకుంటున్నారా</button>
                            </div></>}
                            </div>
                        </div>
                        </div>
                

                
               
               
         

            </div>

          
        </div>
    )
}