import { Button } from "@mui/material";
import React, {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Confetti from 'react-confetti'; // Import the Confetti component

function Venkateswara(){

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [confetti, setConfetti] = useState(false); // State to control the confetti

    const handleOpenSnackbar = (msg) => {
      setMessage(msg);
      setOpen(true);
      setConfetti(true); // Enable confetti when snackbar opens
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
    setConfetti(false); // Disable confetti when snackbar closes
  };
return(
    <div className="Home" style={{background:'',minHeight:'100vh'}}>
       <div className="row" style={{marginRight:'0px',paddingRight:'0px'}}>
                <div className="col" style={{margin:'20px 0px',color:'whitesmoke'}}>
          
                <span style={{display:'flex', margin:'5px'}}>
                {/* {click ? <VolumeUpIcon style={{cursor:"pointer",color:'green', background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => {tog();}}/> : <VolumeOffIcon style={{cursor:"pointer",color:'red',background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => { tog();}}/>} */}
                <a  href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " style={{textDecoration:'none'}}><WhatsAppIcon className="socialIcon" style={{color:'green',margin:'0 10px',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
                <a  href="tel:+919490478707" style={{textDecoration:'none'}}><CallIcon className="socialIcon" style={{color:'#537FE7',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
                </span>
                </div>
        </div>
        
    <div>
      <div style={{ textAlign: "center" }}>
        <img src={require('../src/images/gallery/V.png')}
         style={{ width: '20em', dropShadow: '5px solid black', 
         filter: 'drop-shadow(15px 10px 7px rgba(0, 0, 0, 0.5))', // Add the drop shadow here
        
        }} alt="" />

        <div className="row" style={{ margin: '0px'}}>
          <div className="col" style={{ margin: '15px', padding: '0px' }}>
            <Button
              variant="contained"
              style={{ marginRight: "15px" }}
              onClick={() => handleOpenSnackbar("రామాలయం, రైల్వే క్వార్టర్స్, రాజమండ్రి")}
            >
              ఎక్కడ
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenSnackbar("వేంకటేశ్వరుని దివ్య పాద పద్మములకు 108 శుక్రవారములు పంచామృత అభిషేక వైభవం 22-9-2023 తేదీ నుంచి ప్రారంభం అవుతుంది")}
            >
              ఎప్పటినుంచి
            </Button>
          </div>
        </div>

        <div className="row" style={{ margin: '0px' }}>
          <div className="col" style={{ margin: '15px', padding: '0px' }}>
            <Button
              variant="contained"
              style={{ marginRight: "15px" }}
              onClick={() => handleOpenSnackbar("ఉదయం 8 గంటలకు ")}
            >
              ఎన్నింటికి
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenSnackbar("గణపతి పూజతో ప్రారంభించి అభిషేకం, అలంకరణ,గోవిద నామాల పారాయణ, తీర్ధ ప్రసాద వినియోగం తో ముగింపు ఇలా వరుసగా 108 శుక్రవారములు జరుపుటకు సంకల్పించ బడినది")}
            >
              ఏమేమి చేస్తారు
            </Button>
          </div>
        </div>

        <div className="row" style={{ margin: '0px' }}>
          <div className="col" style={{ margin: '15px', padding: '0px' }}>
            <Button
              variant="contained"
              style={{ marginRight: "15px" }}
              onClick={() => handleOpenSnackbar("మీకు ఏవైనా సందేహాలు ఉంటే, ఈ నంబర్‌ను సంప్రదించండి - , రామాలయం, రైల్వే క్వార్టర్స్, రాజమండ్రి, 9490478707")}
            >
              సందేహాలు
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenSnackbar("భక్తులు తమ గోత్ర నామాలు ద్రవ్యము అందించి సహకరించాలని మనవి")}
            >
              నా పేరు గోత్రం
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
            vertical: 'center', // Position at the top
            horizontal: 'center',
          }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {message}
        </MuiAlert>
      </Snackbar>
      {confetti && <Confetti />}

    </div>
    </div>
)
}

export default Venkateswara;