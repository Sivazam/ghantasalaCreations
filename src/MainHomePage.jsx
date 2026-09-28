import { React, useState, useEffect } from 'react';
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

// Import Firebase (Standard ES6)
import { auth, db } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { checkIsAdmin } from './features/dasara/firebase/dasaraFirestore';

// Dasara Feature
import { DasaraSection } from './features/dasara';

// New Apps Feature
import { NewAppsSection } from './features/new-apps';

// Hero Section
import HeroSection from './components/HeroSection';


export default function MainHomePage(prop) {

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
    background: 'linear-gradient(145deg, rgba(8, 105, 105, 0.94), rgba(5, 70, 73, 0.95))',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#ffffff',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.28)',
    boxShadow: '0 12px 35px rgba(0, 55, 58, 0.25)',
  }));


  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: '',
    color: 'white'
  };

  const cat = [
    {
      image: 'https://cdn.shopify.com/s/files/1/0232/1317/8957/files/doshas.jpg?v=1661752899?ip=x480',
      title: 'వాత తత్వం లక్షణాలు',
      link: '/vaata_qna'
    },
    {
      image: '/qna_card.jpg',
      title: 'ప్రశ్న || సమాధానము',
      link: '/questions'
    },
    {
      image: '/vastu_card.jpg',
      title: 'వాస్తు',
      link: ''
    },
    {
      image: 'https://ak9.picdn.net/shutterstock/videos/6542729/thumb/1.jpg?ip=x480',
      title: 'జ్యోతిషం',
      link: ''
    },
    {
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?cs=srgb&dl=pexels-viresh-studio-1444442.jpg&fm=jpg',
      title: 'వివాహం',
      link: '/nakshatras'
    }, {
      image: 'https://img.freepik.com/free-vector/illustration-horoscope_53876-20594.jpg',
      title: 'నక్షత్రాలు',
      link: ''
    },
    {
      image: 'https://ak9.picdn.net/shutterstock/videos/6542729/thumb/1.jpg?ip=x480',
      title: 'జ్యోతిషం',
      link: ''
    }
  ]
  // మీ శరీర తత్వం ఏదో సులువుగా తెలుసుకోవాలనుకుంటున్నారా

  //for zodiac sign images\

  const [zodiacSign, setZodicaSign] = useState([])

  let arr = []
  let names = ["", "మేషము", "వృషభము", "మిథునము", "కర్కాటకము", "సింహము", "కన్య", "తుల", "వృశ్చికము", "ధనుస్సు", "మకరము", "కుంభము", "మీనము"]
  let links = ["", "/nakshatra_detail"]
  for (let i = 1; i <= 12; i++) {
    let img = require(`../src/images/gallery/s${i}.png`)
    let name = names[i];
    let link = links[i];
    arr.push({ img, name, link })

  }





  console.log("data>>>>>>>>>>>>..", arr)




  const news = ["నేను చేయగలను అనే నమ్మకం నీకు ఉంటే ఎలా చేయాలి అనే మార్గం అదే కనిపిస్తుంది", "సంవత్సరం మారితే రాతలు ఏమీ మారవు ప్రయత్నాలను ఆపితే పనులేవీ సాగవు.", "గమ్యం దూరమైన పయనాన్ని ఆపద్దు.మార్గము కష్టమైన ప్రయత్నాన్ని ఆపద్దు.", "సగం జీవితం వాళ్లు వీళ్లు ఏమనుకుంటారో అనే ఆలోచనతోనే అలసిపోతుంది"];

  // ,"ఊహలు వాస్తవాలకు దూరంగా తీసుకెళ్తాయి కానీ ఎంత దూరం వెళ్ళినా రావాల్సింది వాస్తవానికి





  var img1 = "https://starlust.org/wp-content/uploads/2021/05/astronomy-vs-astrology.jpg"

  var popUpImgSrc = "https://p1.hiclipart.com/preview/867/10/359/india-hinduism-sri-venkateswara-swamy-vaari-temple-krishna-vishnu-mantra-narayana-mahadeva-god-png-clipart.jpg"


  const updates = [];

  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Check if the popup has been shown before using local storage
    const popupShownBefore = localStorage.getItem('popupShown');
    if (!popupShownBefore) {
      setShowPopup(true);
      localStorage.setItem('popupShown', 'true');
    }
  }, []);

  // Fetch Total Chant Count and Devotee Auth State
  const [totalChants, setTotalChants] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const adminStatus = await checkIsAdmin(user.uid);
          setIsAdmin(adminStatus);

          const docRef = doc(db, "users", user.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setTotalChants(snap.data().chant_count || 0);
            localStorage.setItem('totalChants', (snap.data().chant_count || 0).toString());
          }
        } catch (e) {
          console.error("Home Fetch Error:", e);
        }
      } else {
        setIsAdmin(false);
        const stored = localStorage.getItem('totalChants');
        if (stored) {
          setTotalChants(parseInt(stored));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDirectGoogleLogin = async () => {
    setAuthLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || 'Devotee',
          email: user.email || '',
          createdAt: new Date().toISOString()
        }, { merge: true });
      }
      const adminStatus = await checkIsAdmin(user.uid);
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error("Login error:", error);
      if (error.code !== 'auth/popup-closed-by-user') {
        alert("Login failed. Please try again.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDirectLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isGuestMode');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // --- FIREBASE AUTH & ONBOARDING ---
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false); // NEW: Entry modal state
  const [userForm, setUserForm] = useState({ name: '', city: '', phone: '' });
  const [loadingText, setLoadingText] = useState('');

  const handleBannerClick = async () => {
    // 1. Check if user is ALREADY signed in
    if (auth.currentUser) {
      navigate('/shiva-smarana');
      return;
    }
    // 2. Show entry modal for Login/Guest choice
    setShowEntryModal(true);
  };

  // NEW: Guest Mode Handler
  const handleGuestMode = () => {
    localStorage.setItem('isGuestMode', 'true');
    setShowEntryModal(false);
    navigate('/shiva-smarana');
  };

  // NEW: Login Mode Handler
  const handleLoginMode = async () => {
    setShowEntryModal(false);
    setLoadingText("Connecting to divine path...");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        // User exists - Navigate to Temple
        navigate('/shiva-smarana');
      } else {
        // New User - Show Onboarding Modal
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Sign in failed. Please try again.");
    } finally {
      setLoadingText('');
    }
  };

  const handleOnboardingSubmit = async () => {
    if (!userForm.name || !userForm.city || !userForm.phone) {
      alert("Please fill in all details to proceed.");
      return;
    }

    setLoadingText("Creating your updated profile...");
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Get local chant count for merge
      const localChants = parseInt(localStorage.getItem('totalChants') || '0');

      const userData = {
        uid: user.uid,
        name: userForm.name,
        city: userForm.city,
        phone: userForm.phone,
        email: user.email,
        chant_count: localChants, // MERGE: Start with local count
        createdAt: new Date().toISOString()
      };

      // 3. Save to 'users' collection
      await setDoc(doc(db, "users", user.uid), userData);

      // 4. Save to 'leaderboard' collection (Optimized)
      await setDoc(doc(db, "leaderboard", user.uid), {
        name: userForm.name,
        city: userForm.city,
        chant_count: localChants // MERGE: Include local count in leaderboard
      });

      // 5. Clear guest mode flag after successful login
      localStorage.removeItem('isGuestMode');

      // 5. Navigate
      setShowOnboarding(false);
      navigate('/shiva-smarana');
    } catch (error) {
      console.error("Profile Creation Error:", error);
      alert("Failed to create profile. Please check your connection.");
    } finally {
      setLoadingText('');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };



  const videoData = [
    {
      videoURL: 'ubdxrOxLhh8',
      title: 'SriSailam',
      name: ''
    },
    {
      videoURL: '4Auc0h-3Wb0',
      title: 'Kashi',
      name: ''
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

  return (
    <div className={prop.cName} style={{ marginBottom: '0px' }} >
      <div className="top-scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <Navrbar />



      <div className='MainCont'>
        {/* TOP BAR: Luxury Deep Teal & Gold spiritual bar */}
        <div style={{
          background: "linear-gradient(180deg, rgba(7, 63, 66, 0.96) 0%, rgba(4, 48, 51, 0.98) 100%)",
          padding: '8px 16px',
          borderBottom: '1.5px solid rgba(255, 215, 0, 0.35)',
          boxShadow: '0 4px 15px rgba(0, 40, 42, 0.25)'
        }}>
          <div className="row" style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>

            {/* LEFT: Total Chant Count + Login Button next to it */}
            <div className="col-auto" style={{ padding: '4px 0', color: 'whitesmoke', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Chant Count Badge */}
              <div style={{
                background: 'rgba(0,0,0,0.6)',
                padding: '5px 14px',
                borderRadius: '20px',
                border: '1px solid #ffd700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.25)'
              }}>
                <span style={{ fontSize: '1.2rem' }}>🕉️</span>
                <span style={{ fontWeight: 'bold', color: '#ffd700' }}>కౌంట్:</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#fff' }}>{totalChants.toLocaleString('en-IN')}</span>
              </div>

              {/* Login Button / Devotee Profile right next to count */}
              {currentUser ? (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'rgba(0,0,0,0.6)', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  border: '1px solid #ffd700',
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.2)'
                }}>
                  <img 
                    src={currentUser.photoURL || 'https://via.placeholder.com/32'} 
                    alt="Profile" 
                    style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid #ffd700' }} 
                  />
                  <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  {isAdmin && (
                    <span style={{ color: '#000', background: '#ffd700', fontSize: '0.65rem', fontWeight: 'bold', padding: '1px 5px', borderRadius: '4px' }}>
                      👑 Admin
                    </span>
                  )}
                  <button 
                    onClick={handleDirectLogout}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#ff6b6b',
                      borderRadius: '10px',
                      padding: '1px 7px',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      marginLeft: '4px'
                    }}
                    title="Logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleDirectGoogleLogin}
                  disabled={authLoading}
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '5px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.35)'
                  }}
                >
                  <span>🔑</span> {authLoading ? 'లాగిన్...' : 'లాగిన్ / Login'}
                </button>
              )}
            </div>

            {/* RIGHT: Social Icons */}
            <div className="col-auto" style={{ padding: '4px 0', color: 'whitesmoke' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <a href="https://api.whatsapp.com/send?phone=+919490478707&text=%20నమస్తే పంతులుగారు , నా సమస్య ఏమిటి అంటే " style={{ textDecoration: 'none' }} title="WhatsApp">
                  <WhatsAppIcon className="socialIcon" style={{ color: 'green', margin: '0 8px', cursor: "pointer", background: 'white', borderRadius: '50%', fontSize: '2.1rem', padding: '5px', boxShadow: '0 0 8px rgba(0,255,0,0.3)' }} />
                </a>
                <a href="tel:+919490478707" style={{ textDecoration: 'none' }} title="Call">
                  <CallIcon className="socialIcon" style={{ color: '#537FE7', cursor: "pointer", background: 'white', borderRadius: '50%', fontSize: '2.1rem', padding: '5px', boxShadow: '0 0 8px rgba(83,127,231,0.3)' }} />
                </a>
              </span>
            </div>
          </div>
        </div>

          {/* {showPopup ? (
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
                        ) : '' }; */}

        {/* ONBOARDING MODAL */}
        {showOnboarding && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #2d1810 0%, #1a0a0a 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #ffd700',
              width: '90%',
              maxWidth: '400px',
              color: '#fff',
              textAlign: 'center',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
            }}>
              <h3 style={{ color: '#ffd700', fontFamily: 'serif', marginBottom: '20px' }}>Join the Divine Path</h3>
              <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '25px' }}>
                Please provide your details to track your spiritual journey.
              </p>

              <input
                type="text"
                placeholder="Your Name (ex: Ravi Kumar)"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #555', background: '#333', color: 'white' }}
              />
              <input
                type="text"
                placeholder="City (ex: Hyderabad)"
                value={userForm.city}
                onChange={(e) => setUserForm({ ...userForm, city: e.target.value })}
                style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #555', background: '#333', color: 'white' }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #555', background: '#333', color: 'white' }}
              />

              <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '10px' }}>
                Email: {auth.currentUser?.email}
              </p>

              <button
                onClick={handleOnboardingSubmit}
                style={{
                  marginTop: '20px',
                  padding: '12px 30px',
                  background: 'linear-gradient(90deg, #ffd700, #ff8c00)',
                  border: 'none',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#000',
                  width: '100%'
                }}
              >
                Start Abhishekam 🙏
              </button>
            </div>
          </div>
        )}

        {/* LOADING OVERLAY */}
        {loadingText && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffd700'
          }}>
            <div className="spinner-border text-warning" role="status"></div>
            <h4 style={{ marginTop: '20px' }}>{loadingText}</h4>
          </div>
        )}

        {/* ========== HERO SECTION (LUXURY GURUJI VISUAL & ORBIT) ========== */}
        <HeroSection />
        {/* ========== END HERO SECTION ========== */}

        {/* ========== NEW APPS SECTION ========== */}
        <NewAppsSection />
        {/* ========== END NEW APPS SECTION ========== */}

        {/* ========== DASARA NAVARATRI SECTION ========== */}
        <DasaraSection />
        {/* ========== END DASARA NAVARATRI SECTION ========== */}

        {/* ========== SHIVA SMARANA ENTRY SECTION (IMAGE BASED) ========== */}
        <div
          onClick={handleBannerClick}
          style={{
            margin: '20px 15px',
            borderRadius: '20px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: '2px solid rgba(255, 215, 0, 0.4)',
            boxShadow: '0 8px 32px rgba(255, 165, 0, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 215, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 165, 0, 0.2)';
          }}
        >
          {/* RESPONSIVE POSTER IMAGE */}
          <picture>
            {/* Desktop Image (Landscape) */}
            <source media="(min-width: 768px)" srcSet="/shiva_entry_poster_desktop.jpg" />

            {/* Mobile Image (Portrait) - Default */}
            <img
              src="/shiva_entry_poster.jpg"
              alt="Shiva Smarana Entry"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover'
              }}
            />
          </picture>
        </div>
        {/* ========== END SHIVA SMARANA ENTRY SECTION ========== */}

        <div className='container-fluid ' style={{ margin: '15px 0' }}  >
          <Grid className='row' container spacing={2}>
            <Grid className='col-8' item lg={8} md={12} xs={12} sm={12} >
              <Item>
                <div style={{ marginBottom: '20px' }}>
                  <Carousel responsive={zodiacRes} >
                    {arr.map((x, i) =>
                      <a key={i} href={x.link} style={{ textDecoration: 'none' }}>
                        <img alt="img" src={x.img} height={'100px'} width={'auto'} style={{ borderRadius: '50%', filter: 'drop-shadow(5px 5px 5px #222)' }} />
                        <p style={{ marginTop: '5px', color: 'white', fontWeight: 600, filter: 'drop-shadow(5px 5px 5px #222)' }}>{x.name}</p>
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
                      <img id="sliderImage" className="d-block w-100" src="https://img.freepik.com/free-vector/illustration-horoscope_53876-20594.jpg" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                      <img id="sliderImage" className="d-block w-100" src="https://ak9.picdn.net/shutterstock/videos/6542729/thumb/1.jpg?ip=x480" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                      <img id="sliderImage" className="d-block w-100" src="https://www.templepurohit.com/wp-content/uploads/2015/08/Free-Astrology-Predictions-Panchang-Detailed-Horoscope-Report-Hindu-Astrology-1.jpg" alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                      <img id="sliderImage" className="d-block w-100" src="https://www.shutterstock.com/image-vector/silhouette-meditating-woman-lotus-position-260nw-1766776265.jpg" alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                      <img id="sliderImage" className="d-block w-100" src="https://media.gettyimages.com/id/940166200/video/chinese-fengshui-compass.jpg?s=640x640&k=20&c=vvrnfR7lEGEuJmi6MgvR5PeZze1Xiaxxy2NlT1ufAC8=" alt="Third slide" />
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  {/* <div className="user-stats-card">
                    <div className="stat-item">
                      <span className="stat-label">Total Chant Count</span>
                      <span className="stat-value">{totalChants.toLocaleString('en-IN')}</span>
                    </div>
                  </div> */}
                </div>
              </Item>
            </Grid>

            <Grid className='col-4 col-md-12 col-sm-12' item lg={4} md={12} xs={12} sm={12}>
              <Item>
                {news.map((x, i) =>
                  <List key={i} sx={style} component="nav" aria-label="mailbox folders">

                    <ListItem button divider>
                      <ListItemText primary={x} />
                    </ListItem>
                    <Divider />


                  </List>
                )}
              </Item>
            </Grid>

            {/* sri danalakshmi devi,vidya etcc information  */}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', marginTop: '2.5rem' }}>
              {ButtonimagesData.map((image) => (
                <ImageButton
                  focusRipple
                  key={image.title}
                  style={{
                    width: image.width
                  }}
                >
                  <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
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

            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <div style={{ textAlign: 'center', margin: '25px 0 15px' }}>
                <span style={{ color: '#e60000', fontWeight: 800, fontSize: '0.95rem', display: 'block', letterSpacing: '0.5px' }}>
                  వివిధ విభాగాలు
                </span>
                <h2 style={{ color: '#063f42', fontWeight: 800, fontSize: '2.3rem', margin: '5px 0', fontFamily: 'Noto Serif Telugu, serif' }}>
                  కేటగిరీలు
                </h2>
              </div>
              <Carousel responsive={responsive}>
                {cat.map((x, i) =>

                  <div key={i} style={{ margin: '9px 15px' }}>
                    <a href={x.link} style={{ textDecoration: 'none' }}>
                      <Card sx={{ 
                        maxWidth: 345, 
                        background: 'linear-gradient(145deg, rgba(8, 105, 105, 0.96), rgba(5, 70, 73, 0.95))', 
                        borderRadius: '20px', 
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 12px 30px rgba(0, 55, 58, 0.22)',
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 18px 40px rgba(0, 55, 58, 0.35)'
                        }
                      }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="190"
                            image={x.image}
                            alt={x.title}
                            onError={(e) => { e.target.src = '/spiritual_pattern.jpg'; }}
                          />
                          <CardContent style={{ padding: '14px', background: 'rgba(0,0,0,0.12)' }}>
                            <Typography gutterBottom variant="h6" component="div" style={{ fontWeight: '700', color: '#ffffff', fontSize: '1.05rem', margin: 0 }} >
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

      {/* NEW: Entry Choice Modal (Login/Guest) */}
      {showEntryModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
            borderRadius: '20px',
            padding: '40px 30px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            border: '2px solid #ffd700',
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)'
          }}>
            {/* Header */}
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🙏🕉️🙏</div>
            <h2 style={{
              color: '#ffd700',
              fontFamily: 'serif',
              fontSize: '1.5rem',
              marginBottom: '10px',
              textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)'
            }}>
              శివ నామ స్మరణ
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.95rem',
              marginBottom: '30px'
            }}>
              Begin your divine journey
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button
                onClick={handleLoginMode}
                style={{
                  background: 'linear-gradient(135deg, #4285f4 0%, #357ae8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 25px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  style={{ width: '20px', height: '20px', borderRadius: '3px', background: 'white', padding: '2px' }}
                />
                Login with Google
              </button>

              <button
                onClick={handleGuestMode}
                style={{
                  background: 'transparent',
                  color: '#ffd700',
                  border: '2px solid #ffd700',
                  padding: '15px 25px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s, background 0.2s'
                }}
                onMouseOver={(e) => { e.target.style.background = 'rgba(255, 215, 0, 0.1)'; e.target.style.transform = 'scale(1.02)'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.transform = 'scale(1)'; }}
              >
                🕉️ Continue as Guest
              </button>
            </div>

            {/* Footer note */}
            <p style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.75rem',
              marginTop: '25px'
            }}>
              Guest progress is saved locally. Login to sync across devices.
            </p>

            {/* Close button */}
            <button
              onClick={() => setShowEntryModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />



    </div>

  )
}