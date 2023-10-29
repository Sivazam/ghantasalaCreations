import {React, useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Footer from './Footer';
import Navrbar from './Navbar';
import { Chip, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

import ButtonBase from '@mui/material/ButtonBase';
import Shiva from './Shiva';
import ShivaImg from './images/shiva.jpeg'
import { useNavigate } from 'react-router-dom';


export default function MainHomePage(prop){

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const zodiacRes = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 7
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
  
      
  
      const ButtonimagesData = [
        {
          url: 'https://www.ultranewstv.com/wp-content/uploads/2023/02/gold-jewellery-alternative.jpg',
          title: 'ధన ధాన్య ఉద్యోగ వ్యాపార అభివృద్ధికి',
          width: '40%',
        },
        {
          url: 'https://www.sentinelassam.com/wp-content/uploads/2019/10/godess.jpg',
          title: 'అఖండ లక్ష్మీ దేవి కటాక్షమునకు',
          width: '30%',
        },
        {
          url: 'https://www.komalaamorim.com/wp-content/uploads/2019/02/Parvati-2.jpg',
          title: 'ఇల్లాలి క్షేమము సుఖము శాంతికి',
          width: '30%',
        }
      ];
      
      const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
          zIndex: 1,
          '& .MuiImageBackdrop-root': {
            opacity: 0.15,
          },
          '& .MuiImageMarked-root': {
            opacity: 0,
          },
          '& .MuiTypography-root': {
            border: '4px solid currentColor',
          },
        },
      }));
      
      const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      });
      
      const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      }));
      
      const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      }));
      
      const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
      }));

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'rgba(255  , 255, 255, 0.1)',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: '',
        color:'white'
    };

    const cat = [
      
        {
            image:'https://cdn.shopify.com/s/files/1/0232/1317/8957/files/doshas.jpg?v=1661752899?ip=x480',
            title:'వాత తత్వం లక్షణాలు',
            link:'/vaata_qna'
        },
        {
            image:'https://itbix.com/Content/prashnakundali_img/rect2.png',
            title:'ప్రశ్న || సమాధానము',
            link:'/questions'
        },
        {
            image:'https://www.nicepng.com/png/full/248-2487041_each-direction-have-its-means-and-strength-vastu.png',
            title:'వాస్తు',
            link:''
        },
        {
            image:'https://ak9.picdn.net/shutterstock/videos/6542729/thumb/1.jpg?ip=x480',
            title:'జ్యోతిషం',
            link:''
        },
        {
            image:'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?cs=srgb&dl=pexels-viresh-studio-1444442.jpg&fm=jpg',
            title:'వివాహం',
            link:'/nakshatras'
        }, {
            image:'https://img.freepik.com/free-vector/illustration-horoscope_53876-20594.jpg',
            title:'నక్షత్రాలు',
            link:''
        },
        {
            image:'https://ak9.picdn.net/shutterstock/videos/6542729/thumb/1.jpg?ip=x480',
            title:'జ్యోతిషం',
            link:''
        }

         
    ]
    // మీ శరీర తత్వం ఏదో సులువుగా తెలుసుకోవాలనుకుంటున్నారా

    //for zodiac sign images\

    const [zodiacSign,setZodicaSign] = useState([])
    
    let arr = []
    let names = ["","మేషము","వృషభము","మిథునము","కర్కాటకము","సింహము","కన్య","తుల","వృశ్చికము","ధనుస్సు","మకరము","కుంభము","మీనము"]
    let links = ["","/nakshatra_detail"]
    for(let i = 1 ; i <= 12 ; i++ ){
            let img = require(`../src/images/gallery/s${i}.png`)
            let name = names[i];
            let link = links[i];
            arr.push({img,name,link})

    }





    console.log("data>>>>>>>>>>>>..",arr)




    const news=["నేను చేయగలను అనే నమ్మకం నీకు ఉంటే ఎలా చేయాలి అనే మార్గం అదే కనిపిస్తుంది","సంవత్సరం మారితే రాతలు ఏమీ మారవు ప్రయత్నాలను ఆపితే పనులేవీ సాగవు.","గమ్యం దూరమైన పయనాన్ని ఆపద్దు.మార్గము కష్టమైన ప్రయత్నాన్ని ఆపద్దు.","సగం జీవితం వాళ్లు వీళ్లు ఏమనుకుంటారో అనే ఆలోచనతోనే అలసిపోతుంది"];

    // ,"ఊహలు వాస్తవాలకు దూరంగా తీసుకెళ్తాయి కానీ ఎంత దూరం వెళ్ళినా రావాల్సింది వాస్తవానికి
  
  
      
  

    var img1 = "https://starlust.org/wp-content/uploads/2021/05/astronomy-vs-astrology.jpg"

    var popUpImgSrc = "https://p1.hiclipart.com/preview/867/10/359/india-hinduism-sri-venkateswara-swamy-vaari-temple-krishna-vishnu-mantra-narayana-mahadeva-god-png-clipart.jpg"


    const updates = [ ];

      const [showPopup, setShowPopup] = useState(true);

      useEffect(() => {
        // Check if the popup has been shown before using local storage
        const popupShownBefore = localStorage.getItem('popupShown');
        if (!popupShownBefore) {
          setShowPopup(true);
          localStorage.setItem('popupShown', 'true');
        }
      }, []);
    
      const handleClosePopup = () => {
        setShowPopup(false);
      };



      const videoData = [
        {
          videoURL: 'ubdxrOxLhh8',
          title: 'SriSailam',
          name:''
        },
        {
          videoURL: '4Auc0h-3Wb0',
          title: 'Kashi',
          name:''
        },
        // {
        //   videoURL: 'BDyxpL7JQ0k',
        //   title: 'Bha',
        //   name:'Maa Vaishno Devi'
        // },
      ];


      const navigate = useNavigate(); // Get the navigate function

      const handleButtonClick = () => {
        navigate('/shiva'); // Navigate to '/shivaParvathi'
      };

      return(
    <div className={prop.cName}  style={{marginBottom:'0px'}} >
                    <Navrbar/>

                

                <div className='MainCont'>  
                <div className="row" style={{marginRight:'0px',paddingRight:'0px'}}>
                {/* <div className="col-11"></div> */}
                <div className="col" style={{margin:'10px',color:'whitesmoke'}}>
                    
                {/* <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" checked />
                <label className="custom-control-label" for="customSwitch1"></label>
                </div> */}
                <span style={{display:'flex', margin:'5px'}}>
                {/* {click ? <VolumeUpIcon style={{cursor:"pointer",color:'green', background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => {tog();}}/> : <VolumeOffIcon style={{cursor:"pointer",color:'red',background:'white',borderRadius:'50%',fontSize:'2rem'}} onClick={() => { tog();}}/>} */}
                <a  href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " style={{textDecoration:'none'}}><WhatsAppIcon className="socialIcon" style={{color:'green',margin:'0 10px',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>
                <a  href="tel:+919490478707" style={{textDecoration:'none'}}><CallIcon className="socialIcon" style={{color:'#537FE7',cursor:"pointer", background:'white',borderRadius:'50%',fontSize:'2rem',padding:'5px'}}/></a>

                </span>


</div>

                         {showPopup ? (
                            <div className="popup-overlay " >
                            <div className="popup-container " style={{background:'white'}}>
                            <center>
                                  <Chip  size='small' color='info' label=" కార్తీక మాసం special"/>
                                </center>
                                <button className="close-button" onClick={handleClosePopup}>
                                
                                <h6 style={{padding:'10px',background:'red',color:'white'}}>X</h6>
                                </button>
                                <div className="popup-content" style={{textAlign:'center',padding:"5px",marginTop:'30px'}}>
                                <h5 style={{fontWeight:'900',color:'yellow',WebkitTextStroke:'1px red',margin:'10px 0'}}>
                               పార్వతీ పరమేశ్వరుల కళ్యాణంలో మీరు మగ పెళ్ళి వారా ఆడ పెళ్లి వారా ఇక్కడ తెలుసుకోండి
                                  </h5>     
                                  <div>
                                  <img height={150} width={150} style={{borderRadius:'50%', objectFit:'cover',marginTop:'15px'}} src={ShivaImg} alt="" />
                               </div>
                                                          


                                <button onClick={handleButtonClick}  style={{margin:'20px 0'}}  className="btn btn-warning" > తెలుసుకొండి
                          </button>
                              
                                </div>
                               
                            </div>
                            </div>
                        ) : '' };

                    </div>

                    <div>
                      {/* <Shiva/> */}
                    </div>
                  <div className="container">
                    <div className="row">
                    {videoData.map((item, index) => (
                      <div key={index} className="col-sm-12 col-md-6 col-lg-6">
                        <div className="video-card" style={{marginBottom:'15px'}}>
                          <iframe
                            width="100%"
                            height="315"
                            style={{borderRadius:'10px',border:'2px solid white',boxShadow:'4px 4px 5px black'}}
                            src={`https://www.youtube.com/embed/${item.videoURL}`}
                            title="YouTube Video"
                            frameBorder="0"
                            allowFullScreen
                          ></iframe>
                          <h3 className="mainText text-center" style={{marginTop:'3px'}}>{item.title}</h3>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>

                    <div className='container-fluid ' style={{margin:'15px 0'}}  >
                    <Grid  className='row' container spacing={2}>
                        <Grid className='col-8' item lg={8} md={12} xs={12} sm={12} >
                            <Item>
                                <div style={{marginBottom:'20px'}}>
                                <Carousel responsive={zodiacRes} >
                                    {arr.map((x,i) => 
                                    <a href={x.link} style={{textDecoration:'none'}}>
                                    <img alt="img" src={x.img}  height={'100px'} width={'auto'}  style={{borderRadius:'50%', filter: 'drop-shadow(5px 5px 5px #222)'}}/>
                                    <p style={{marginTop:'5px',color:'white',fontWeight:600,filter: 'drop-shadow(5px 5px 5px #222)'}}>{x.name}</p>
                                    </a>
                                    )}

                                </Carousel>
                                </div>
                                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                    </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                            <img id="sliderImage" className="d-block w-100" src="https://img.freepik.com/free-vector/illustration-horoscope_53876-20594.jpg" alt="First slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img id="sliderImage" className="d-block w-100" src="https://ak9.picdn.net/shutterstock/videos/6542729/thumb/1.jpg?ip=x480" alt="Second slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img id="sliderImage" className="d-block w-100" src="https://www.templepurohit.com/wp-content/uploads/2015/08/Free-Astrology-Predictions-Panchang-Detailed-Horoscope-Report-Hindu-Astrology-1.jpg" alt="Third slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img id="sliderImage" className="d-block w-100" src="https://www.shutterstock.com/image-vector/silhouette-meditating-woman-lotus-position-260nw-1766776265.jpg" alt="Third slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img id="sliderImage" className="d-block w-100" src="https://media.gettyimages.com/id/940166200/video/chinese-fengshui-compass.jpg?s=640x640&k=20&c=vvrnfR7lEGEuJmi6MgvR5PeZze1Xiaxxy2NlT1ufAC8=" alt="Third slide"/>
                                            </div>
                                        </div>
                                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                    </div>
                            </Item>
                        </Grid>
                        
                        <Grid className='col-4 col-md-12 col-sm-12' item lg={4} md={12} xs={12} sm={12}>
                            <Item>
                                {news.map(x => 
                                <List sx={style} component="nav" aria-label="mailbox folders">
                                
                                    <ListItem button divider>
                                    <ListItemText primary={x} />
                                    </ListItem>
                                    <Divider />
                            
                                
                                </List>
                                )}
                            </Item>
                        </Grid>

                        {/* sri danalakshmi devi,vidya etcc information  */}
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%',marginTop:'2.5rem' }}>
                        {ButtonimagesData.map((image) => (
                            <ImageButton
                            focusRipple
                            key={image.title}
                            style={{
                                width: image.width
                            }}
                            >
                            <ImageSrc style={{ backgroundImage: `url(${image.url})` }}  />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image >
                                <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                                >
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                            </ImageButton>
                        ))}
                        </Box>

                        {/* <CardMedia
                        component='video'
                        image={"https://youtu.be/RrpoYrDkRk8"}
                        autoPlay
                    /> */}

                        <Grid item xs={12} style={{color:'#fff',textAlign:'center'}}>
                            <h1 style={{margin:'20px 0'}}>కేటగిరీలు</h1>
                            <Carousel responsive={responsive}>
                            {cat.map((x,i)=> 

                            <div key={i} style={{margin:'9px 20px'}}>
                                <a href={x.link} style={{textDecoration:'none'}}>
                                <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={x.image}
                                    alt="green iguana"
                                    />
                                    <CardContent >
                                    <Typography gutterBottom variant="h6" component="div" style={{fontWeight:'700'}} >
                                        {x.title}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                                </a>
                            </div>
                            )}
                        </Carousel> 
                        </Grid>
                      
                        {/* <div  className='row' style={{display:'flex',marginLeft:'3px',marginTop:'10px'}}>
      
                            {cat.map((x)=> 

                                <div className='col col-sm-6 col-md-3 col-xs-4 lg-3 xl-3' style={{margin:'9px 0px'}}>
                                     <Card sx={{ maxWidth: 345 }}>
                                     <CardActionArea>
                                         <CardMedia
                                         component="img"
                                         height="200"
                                         image={x.image}
                                         alt="green iguana"
                                         style={{width:'100%',objectFit:'cover'}}
                                         />
                                         <CardContent>
                                         <Typography gutterBottom variant="h5" component="div">
                                             {x.title}
                                         </Typography>
                                         </CardContent>
                                     </CardActionArea>
                                     </Card>   
                            </div>
                            )}
                        </div> */}
                        {/* <Grid item xs={8}>
                            <Item>xs=8</Item>
                        </Grid> */}
                    </Grid>

                    </div>



                </div>
                <Footer/>
 


    </div>

    )
}