import React, {  useState } from "react";
import * as $ from 'jquery';
import useSound from 'use-sound';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import FinalAudio1 from "../src/images/sounds/1.mp3"
import FinalAudio2 from "../src/images/sounds/2.mp3"
import FinalAudio3 from "../src/images/sounds/3.mp3"
import FinalAudio4 from "../src/images/sounds/4.mp3"
import FinalAudio5 from "../src/images/sounds/5.mp3"
import FinalAudio6 from "../src/images/sounds/6.mp3"
import FinalAudio7 from "../src/images/sounds/7.mp3"


export default function FormCollect(prop){
  // var telegram_bot_id = "6239637526:AAFik4iiUuO10DJnTkKQahjQ_-lSRkAojzQ";
  var telegram_bot_id = "6256956364:AAFaD3Smk40Th1cT3I7JlLtrZmljrV3L4Wk";
  //chat id
  // var chat_id = 904702019;
  var chat_id = 855561462;

  // const Fdata = useRef()


  const soundsList = [FinalAudio1,FinalAudio2,FinalAudio3,FinalAudio4,FinalAudio5,FinalAudio6,FinalAudio7]
  
  const RN = Math.floor(Math.random() * 7);

  const aud =  soundsList[RN];
  

  const  [sub] = useSound(aud,{volume:0.25})

  const [details,setDetails] = useState(
    {
      name:"",
      gotram:"",
      place:"",
      date:"",
      time:"",
      contact:"",
      email:""
    }
  )

  function handleChange(e){
    e.preventDefault();

    const data = {...details};

    data[e.target.id] = e.target.value;
    setDetails(data);
    

    

    // console.log("details:",details)

  }

var Name, Gotram,Place,Date,Time,Contact,Email,Message,Question;

var ready = function () {
  Name = document.getElementById("name").value;
  Gotram = document.getElementById("gotram").value;
  Place = document.getElementById("place").value;
  Date = document.getElementById("date").value;
  Time = document.getElementById("time").value;
  Email = document.getElementById("email").value;
  Contact = document.getElementById("contact").value;
  Question = prop.question;
  Message = "Name: " + Name + "\nGotram: " + Gotram + "\nPlace:" + Place +"\nDate:" + Date + "\nTime:" + Time + "\nEmail:" + Email + "\nContact Number:" + Contact + "\nQuestion:" + Question;
};
var sender = function () {
    ready();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": Message
        })
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
      document.getElementById("name").value = "";
      document.getElementById("gotram").value = "";
      document.getElementById("place").value = "";
      document.getElementById("date").value = "";
      document.getElementById("time").value = "";
      document.getElementById("email").value = "";
      document.getElementById("contact").value = "";

    return false;
};

      

    

    function handleSubmit(e){

      e.preventDefault();
      sub();

      console.log(details);
      sender();


      // setTimeout(() =>{

      
      //     // Coding
      //     document.getElementsByClassName('.closeBtn')[0].click(); //or  $('#IDModal').modal('hide');
      //     return false;
      

      // },3000)

    }
    

   


    return(<>
      
        <div id="IDModal" className="mainForm" style={{ color:'white', padding:'30px 0px'}}>
           <form onSubmit={handleSubmit} style={{padding:'30px'}}>
           <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">{prop.question}</h5>
                                <button  style={{border:"none", background:'none'}} type="button" className="closeBtn" data-bs-dismiss="modal" aria-label="Close"><CloseOutlinedIcon style={{color:'red',background:"none"}}/></button>
                            </div>

            <div className="form-group">
              <label for="exampleInputPassword1">Full Name *</label>
              <input id="name" name="name" type="text"  className="form-control"  placeholder="Full Name"  onChange={handleChange} value={details.name} required/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Gotram *</label>
              <input id="gotram" name="gotram" type="text" className="form-control"  placeholder="Gotram" onChange={handleChange} value={details.gotram} required/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Birth Place</label>
              <input id="place" name="place" type="text" className="form-control"  placeholder="Birth Place" onChange={handleChange} value={details.place} required/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Birth Date *</label>
              <input id="date"  name="date" type="date" className="form-control" placeholder="Birth date" onChange={handleChange} value={details.date} required/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Birth Time *</label>
              <input id="time" name="time" type="time" className="form-control"  placeholder="Birth time" onChange={handleChange} value={details.time} required/>
            </div>
 
  {/* <div className="form-group">
    <label for="exampleInputPassword1">Question *</label>
    <textarea type="text" className="form-control" id="exampleInputPassword1" placeholder="Please enter Your Question" />
  </div> */}
  <div className="form-group">
    <label for="exampleInputPassword1">Contact Number *</label>
    <input id="contact" name="contact" type="number" className="form-control"  placeholder="Mobile Number" onChange={handleChange} value={details.contact} required/>
    <small id="emailHelp" className="form-text " style={{color:'yellow'}}>    దయచేసి వాట్సాప్ నంబర్‌ను అందించండి, తద్వారా. మేము మీకు సమాధానం పంపగలము
</small>

  </div>
  <div className="form-group" >
    <label for="exampleInputEmail1">Email address (optional)</label>
    <input id="email" name="email" type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} value={details.email} />
    <small id="emailHelp" className="form-text " style={{color:'grey'}}>We'll never share your email with anyone else.</small>
  </div>
  <button type="submit" disabled={!(details.name && details.gotram && details.date && details.time && details.contact && (details.contact.length >= 10))} className="btn btn-success" data-bs-dismiss="modal" aria-label="Close" style={{marginTop:'20px'}}>మీరు సమాధానం తెలుసుకోవాలనుకుంటున్నారా</button>
{/* <button onClick={test}>check</button> */}
</form>
        </div>





                </>
    )
}

