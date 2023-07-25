import React from 'react';
import Footer from './Footer';
import Navrbar from './Navbar';
import data from './data/nakshatra'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';




export default function Nakshatras(prop){

    const [value, setValue] = React.useState(0);

    const handleChange = (e) => {
        setValue(e);
    };
    return(
        <>
                <div className={prop.bg}>

        <Navrbar/>
            <div>
            <h1 className='mainText' style={{margin:'1.5rem 0'}}>వివాహానికి సరిపడు నక్షత్రములు</h1>
                <div className="container accordion accordion-flush" id="accordionFlushExample" style={{}}>

                    {data.map((x,i) => {
                        return(
                            <div className="accordion-item" key={i} style={{background:'rgba(41, 40, 40, 0.7)', color:'#D8D8D8', fontWeight:700, fontSize:'1.1rem',textAlign:'center'}}>
                            <h2 className="accordion-header" id={`flush-heading${x.id}`} >
                                <button style={{background:'rgba(41, 40, 40, 0.6)',fontSize:'1.5rem'}} key={i} className="mainText accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${x.id}`} aria-expanded="false" aria-controls={`flush-collapse${x.id}`}>
                                {x.name}
                                </button>
                            </h2>

                            <div key={i} id={`flush-collapse${x.id}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${x.id}`} data-bs-parent="#accordionFlushExample">
                                
                            <Box sx={{ width: '100%', bgcolor: 'background.paper' ,m:'2'}}>
                                        <Tabs value={value} onChange={handleChange} centered>
                                            <Tab label="ఒకటోవ పాదం"  />
                                            <Tab label="రెండవ పాదం" />
                                            <Tab label="మూడవ పాదం" />
                                            <Tab label="నాల్గవ పాదం" />
                                        </Tabs>
                                        </Box>
                                <div style={{}} className="accordion-body">{x.desc}</div>
                                <div> </div>

                                   

                                 
                                    


                            </div>
                        </div>
                        )
                    })}
                        
              
                 
                </div>
            </div>
        <Footer/>
        </div>

        </>
    )
}