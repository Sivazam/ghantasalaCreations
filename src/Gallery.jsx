import { textAlign } from "@mui/system";
import React from "react";
import gal from '../src/images/gal.jpg'
import Footer from "./Footer";
import Navrbar from "./Navbar";
// import sh from '../src/images/gallery/1.jpg'
import { gallery } from "./galleryData";

export default function Gallery(prop){

  
    const images = [
        {
          original: './src/images/gallery/1.jpg',
        },
        
      ];

gallery.map(x => console.log(x));
      
    return(

      <div className="Home">

        {/* <div className="  galHero" style={{}}> */}
        <Navrbar />


        {/* </div> */}
        <div className="container ">
          <h1 className="mainText " style={{margin:'2rem 0',fontSize:'3rem'}}>ఫొటో గ్యాలరీ</h1>
          <div className="row" style={{marginRight:'0px',marginLeft:'0px', textAlign:'center'}}>
            <h1 className="mainText" style={{textAlign:'left', margin:'5px', fontSize:'1.8rem',textDecoration:'underline'}}>Shiva rathri - 2023</h1>
            {gallery.map((x,i)=> 
            {return(
               <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 image-box" style={{margin:'10px 0'}}>
                <img className="zoom" style={{width:'100%',height:'100%',borderRadius:'5px'}} key={i}   src={x} alt="" />
               </div>)
          })}
           

            
            
          </div>
        </div>
        
        <Footer/>   


        </div>





            ) 
}