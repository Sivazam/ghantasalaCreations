// Currently not using this indivudual component - merged it with test cards for efficency


import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';


export default function OwnQuetion(){

    const [question,setQuestion] = useState("")

    function handleChange(e){
        e.preventDefault();
    
       var q =  e.target.value;
    
        setQuestion(q);
        
    
      }

      function handleSubmit(e){
            e.preventDefault();
       
      }



    return(
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
        <TextField  onChange={handleChange} multiline style={{  borderRadius: "10px", padding:'7px 3px'}}
          minRows={3} maxRows={5} fullWidth  value={question}  size="normal" className="mainText card-main" margin='none' color='warning' id="outlined-multiline-flexible" label="పై లిస్టులో లేని మీ మనసులోని ప్రశ్నను ఇక్కడ అడగండి" variant="outlined" />
       </Box>
        <span style={{textAlign:'center', justifyContent:'center'}}>      
            <button onClick={handleSubmit} type="submit" disabled={!question} className="btn btn-success" style={{marginTop:'20px',width:'auto',fontSize:'1rem'}}>మీరు సమాధానం తెలుసుకోవాలనుకుంటున్నారా !!!</button>
        </span>
    </div>
  </div>
    )
}