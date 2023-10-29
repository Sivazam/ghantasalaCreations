import { Chip } from '@mui/material';
// import { Button } from 'bootstrap';
import React, {useState} from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Define your responses
const responses = ['మీరు మగ పెళ్ళి వారు', 'మీరు ఆడ పెళ్లి వారు'];




function Shiva() {

    // Create a random response message
    const [show, setShow] = useState(false);
    const [response, setResponse] = useState('');
    const [UserData, setUserData] = useState({
      name: '',
      phone: '',
      city: '',
      question: '',
    });
  
    const handleClose = () => setShow(false);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      //   // Get form data
      // Get form data
    const uname = e.target.name.value;
    const uphone = e.target.phone.value;
    const ucity = e.target.city.value;
    const uquestion = e.target.question.value;


    // Update the UserData state
    setUserData({
      name: uname,
      phone: uphone,
      city: ucity,
      question: uquestion,
    });

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(randomResponse);
      setShow(true);

    };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    textAlign: 'center',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  };

  const chipLabels = [
    'ఉదయం 8 గంటలకు గణపతి పూజ',
    'తర్వాత పంచామృత అభిషేకం',
    'తర్వాత బిల్వార్చన',
    'తదుపరి అలంకారం',
    'హారతి, మంత్రపుష్పం',
    'తీర్థ ప్రసాద వినియోగం',
  ];

  return (
    <div className="Home container-fluid" style={{paddingBottom:'70px'}}>
        <span style={{display:'flex', padding:'15px 0px 0px'}}>
                {/* {click ? <VolumeUpIcon style={{cursor:"pointer",color:'green', background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => {tog();}}/> : <VolumeOffIcon style={{cursor:"pointer",color:'red',background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => { tog();}}/>} */}
          <a  href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " style={{textDecoration:'none'}}><WhatsAppIcon className="socialIcon" style={{color:'green',margin:'0 10px',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
          <a  href="tel:+919490478707" style={{textDecoration:'none'}}><CallIcon className="socialIcon" style={{color:'#537FE7',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>

        </span>
      <header className="mainTitleText text-center py-3" >
        <h1 style={{fontWeight:900,marginTop:'30px'}}>  మీరు ఏ వైపు ??</h1>
      </header>
      <div className="container" >
        <div className="row justify-content-center align-items-center">
          <div className="col-md-12 col-lg-12 col-xl-12"style={{}}>
            <div className="card p-4 text-center" style={{borderRadius:'15px',background:'rgba(0,0,0,0.2)',boxShadow:'7px 5px 5px 5px'}}>
              <h3 style={{ fontWeight: 900, color: 'white',marginTop:'20px' }}>వరుడు పరమేశ్వరుడు వధువు ఉమాదేవి</h3>
              <p style={{ fontSize: '0.8em', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)' }}>తేదీ 12-12-2023 ఉదయం 10 గంటలకు  ప్రారంభం</p>
    
              <div className='text-center' style={{ padding: '10px 10px 20px', borderRadius: '10px' }}>
                {chipLabels.map((label, index) => (
                  <Chip key={index} label={label} color='secondary' style={{ margin: '7px'}} />
                ))}
              </div>

              <div className="rsvp-form">
                <form id="rsvpForm" onSubmit={handleFormSubmit} >

                
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>{UserData.name} గారు, మీ సమాధానం</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>{response}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                <span style={{ textAlign: 'center',color:'white' }}>
                <h3 style={{ fontWeight: '700' }}>మగపెళ్లివారా</h3>
                <span style={{ color: 'green', fontWeight: 'bold'}}>( లేదా )</span>
                <h3 style={{ fontWeight: '700',margin:'10px 0px 20px' }}>ఆడపెళ్లివారా</h3>
              </span>   
              <span style={{background:'white'}}>         
              <div className="mb-3">
                <input type="text" className="form-control" id="name" name="name" required placeholder="మీ పేరు" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="phone" name="phone" required placeholder="ఫోన్" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="city" name="city" required placeholder="నగరం" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" id="question" name="question" placeholder="నా సందేహం"></textarea>
              </div>
                  <button className="btn btn-success" type="submit">నేను ఎవరి తరపున</button>
              </span>
                </form>

                
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="text-center p-3" style={{ color:'grey'}}>

<div style={{margin:"10px 0"}}>
<a  href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " style={{textDecoration:'none'}}><WhatsAppIcon className="socialIcon" style={{color:'green',marginRight:'10px',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
   <a  href="tel:+919490478707" style={{textDecoration:'none'}}><CallIcon className="socialIcon" style={{color:'#537FE7',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
   </div>

  © {2023} Copyright  
  <a className="footerTitle" href="/" style={{textDecoration:'none', fontWeight:500,color:'yellow'}}> | Ghantasala Arts |</a>
  </div>
    </div>
  );
}

export default Shiva;
