import React, { useState } from 'react';
import './ColorfulButtons.css';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Navrbar from './Navbar';

function Sample() {
  const [showButtons, setShowButtons] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const buttonData = [
    { btnName: 'ఎక్కడ', content: 'రాజమండ్రి మా స్వగృహంలో' },
    { btnName: 'ఏ రోజు', content: '7-9-2023 తేదీన' },
    { btnName: 'ముహూర్త సమయం', content: 'ఉదయం 11:20 ని,లకు, శుభ ముహూర్తాన' },
    { btnName: 'మా కోరిక', content: 'మా మనుమడికి మీ ఆశీస్సులు అందచేయాలని మా కోరిక' }
  ];

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleButtonClick = (button, event) => {
    setAnchorEl(event.currentTarget);
    setActiveButton(button);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveButton(null);
  };

  return (
    <>  
    <div className='bodyBg'>   
     <Navrbar/>
    <div className="container" >
      {!showButtons && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 className='HeadText' style={{ display: 'block', width: '100%'}}>ఘంటసాల వారి మనుమడి అన్నప్రాసన ఆహ్వాన పత్రిక </h3>
            <button id="showButtons" style={{ filter: 'drop-shadow(7px 7px 5px black)',marginTop:'1rem',minWidth:'200px',color:'red',fontWeight:'900' }} className="btn btn-warning" onClick={toggleButtons}>
              వివరాలు
            </button>
          </div>
        </div>
      )}
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh' }}>
      {showButtons && (
        <>        

        <div className="button-container">
        <h3 className='HeadTextVisible' style={{textAlign:"center", width: '100%'}}>వివరాలు</h3>

          {buttonData.map((button, index) => (
            <Button
              key={index}
              className={`button colorful-button ${button === activeButton ? 'active' : ''}`}
              onClick={(event) => handleButtonClick(button, event)}
              style={{color:'white',margin:'10px',fontSize:'1.2rem',padding:'7px'}}
            >
              {button.btnName}
            </Button>
          ))}
        </div>
        </>

      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{activeButton?.content}</Typography>
      </Popover>
      </div>
      {/* <div id="content">
        {activeButton && <p>{activeButton.btnName}</p>}
      </div> */}
    </div>
    </div>  
    </>

  );
}

export default Sample;
