import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navrbar from "./Navbar";
// import Footer from "./Footer";
import Gallery from "./Gallery";
import HomeMain from "./HomeMain";
import Nakshatras from "./Nakshatras";
import Projects from "./Projects";
import MainHomePage from "./MainHomePage";
import NakshatraDetail from "./NakshatraDetail";
import VataQna from "./VataQna";
import House from "./House";
import Venkateswara from "./Venkateswara";





export default function HomePage()
{


    
   
    return(
        // <div className="Home " style={{paddingBottom:'0px'}} >
        <>

                <BrowserRouter>
                    <Routes>
                    {/* <Route path="/" element={<HomePage />}> unused*/} 
                        <Route path="/" >
                        {/* <Route path="" element={<HomeMain />} /> unused */} 
                        <Route index element={<MainHomePage cName="Home" />} />
                        <Route path="gallery" element={<Gallery cName="galHero" bg = "Home"/>} />
                        <Route path="house" element={<House cName="galHero" bg = "Home"/>} />
                        <Route path="questions" element={<HomeMain cName="Home"/>} />
                        <Route path="nakshatras" element={<Nakshatras cName="galHero" bg = "Home"/>} />
                        <Route path="nakshatra_detail" element={<NakshatraDetail cName="galHero" bg = "Home"/>} />
                        <Route path="projects" element={<Projects cName="galHero" bg = "Home"/>} />
                        <Route path="vaata_qna" element={<VataQna cName="galHero" bg = "Home"/>} />
                        <Route path="venkateswara" element={<Venkateswara cName="galHero" bg = "Home"/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>

                
            </>
        // </div>
    )
}