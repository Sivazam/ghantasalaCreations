import React, { useState } from "react";
import qna from './Questions'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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
      const [click,setClick] = useState(false);

      const [ownQuestion,setownQuestion] = useState("");
      const [oqSelect,setoqSelect] = useState(false)


      
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



      function handleChangeOQ(e){
        setownQuestion(e.target.value)
        // alert(ownQuestion)
        console.log(e)
        console.log(e.target)
        console.log(e.target.value)
        // play();
      }

      function OQquestion(e){
        setoqSelect(true);
        setSelect(ownQuestion);

        setTimeout( setownQuestion(""), 5000)
        e.preventDefault();
        play();

        
      }

    return(

        <>
        <div className="container-fluid  mainContainer " style={{paddingRight:'0px'}}>
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
                            <div className="modal-content" style={{background: "rgba(41, 40, 40, 0.6)"}} >
                      {click ? <FormCollect question={select}/> : <FormCollect question={select}/>
                      
                            // <><div className="modal-header">
                            //     <h5 className="modal-title" id="exampleModalLabel"></h5>
                            //     <button style={{border:"none", background:'none'}} type="button" className="" data-bs-dismiss="modal" aria-label="Close"><CloseOutlinedIcon style={{color:'red',background:"none"}}/></button>
                            // </div>
                            
                            // <div className="modal-body"  >
                            //     <h4 className="mainText" style={{fontWeight:800}} >{select}</h4>
                            // </div>
                            // <div className="modal-footer" style={{textAlign:'center',justifyContent:'center'}}>
                            //     {/* <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button> */}
                            //     <button type="button" className="btn btn-success" onClick={q} >మీరు సమాధానం తెలుసుకోవాలనుకుంటున్నారా</button>
                            // </div></>
                            
                            
                            }
                            </div>
                        </div>
                        </div>
            </div> 
        </div>




        <div className="container-fluid  mainContainer ">
                <div className="row lm90">
                    <h1 className="mainText" style={{textAlign:"center",margin:'50px 0'}}>(OR)</h1>
                {/* <h4 className="mainText">If the above question's arent the one you want to know. enter your own question below</h4> */}
                {/* <textarea  className="mainText card-main" style={{fontWeight:600}} placeholder="పై ప్రశ్నలలో మీ ప్రశ్న లేకుంటే, దయచేసి మీ స్వంత ప్రశ్నను వ్రాయడానికి ఇక్కడ క్లిక్ చేయండి"></textarea> */}
                <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            >   
            <h1 className='mainText'>పై లిస్టులో లేని మీ మనసులోని ప్రశ్నను ఇక్కడ అడగండి</h1>
                <TextField  onChange={handleChangeOQ} multiline style={{  borderRadius: "10px", padding:'7px 3px'}}
                minRows={3} maxRows={5} fullWidth  value={ownQuestion}  size="normal" className="mainText card-main" margin='none' color='warning' id="outlined-multiline-flexible" label="పై లిస్టులో లేని మీ మనసులోని ప్రశ్నను ఇక్కడ అడగండి" variant="outlined" />
            </Box>
                <span style={{textAlign:'center', justifyContent:'center'}}>      
                    <button  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={OQquestion} type="submit" disabled={!ownQuestion} className="btn btn-success" style={{marginTop:'20px',width:'auto',fontSize:'1rem'}}>మీరు సమాధానం తెలుసుకోవాలనుకుంటున్నారా !!!</button>
                </span>
            </div>
        </div>
  </>
    )
}