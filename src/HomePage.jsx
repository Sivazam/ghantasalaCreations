import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navrbar from "./Navbar";
import Footer from "./Footer";
import Gallery from "./Gallery";
import HomeMain from "./HomeMain";





export default function HomePage()
{


    
   
    return(
        // <div className="Home " style={{paddingBottom:'0px'}} >
        <>

                <BrowserRouter>
                    <Routes>
                    {/* <Route path="/" element={<HomePage />}> */}
                        <Route path="/" >
                        {/* <Route path="" element={<HomeMain />} /> */}
                        <Route index element={<HomeMain  cName="Home"/>} />
                        <Route path="gallery" element={<Gallery cName="galHero" bg = "Home"/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </>
        // </div>
    )
}