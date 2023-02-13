import React, { useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


export default function FormCollect(prop){

  const [details,setDetails] = useState(
    {
      name:"",
      gotram:"",
      date:"",
      time:"",
      contact:"",
      email:""
    }
  )

  function handleChange(e){

    setDetails(
      {
        name: e.target.name.value,
        gotram:e.target.gotram.value,
        date:e.target.date.value,
        time:e.target.time.value,
        contact:e.target.contact.value,
        email:e.target.email.value


      }

    )

    console.log(details.name)

  }
    return(<>
      
        <div style={{ color:'white', padding:'30px 0px'}}>
           <form style={{padding:'30px'}}>
           <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{prop.question}</h5>
                                <button style={{border:"none", background:'none'}} type="button" className="" data-bs-dismiss="modal" aria-label="Close"><CloseOutlinedIcon style={{color:'red',background:"none"}}/></button>
                            </div>
  {/* <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div> */}
  {/* <h4 style={{margin:'15px 0px'}}></h4> */}
   <div class="form-group">
    <label for="exampleInputPassword1">Full Name *</label>
    <input name="name" type="text"  class="form-control" id="exampleInputPassword1" placeholder="Full Name"  onChange={handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Gotram *</label>
    <input name="gotram" type="text" class="form-control" id="exampleInputPassword1" placeholder="Gotram" />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Birth Date *</label>
    <input  name="date" type="date" class="form-control" id="exampleInputPassword1" placeholder="Birth date" />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Birth Time *</label>
    <input name="time" type="time" class="form-control" id="exampleInputPassword1" placeholder="Birth time" />
  </div>
 
  {/* <div class="form-group">
    <label for="exampleInputPassword1">Question *</label>
    <textarea type="text" class="form-control" id="exampleInputPassword1" placeholder="Please enter Your Question" />
  </div> */}
  <div class="form-group">
    <label for="exampleInputPassword1">Contact Number *</label>
    <input name="contact" type="number" class="form-control" id="exampleInputPassword1" placeholder="Mobile Number" />
  </div>
  <div class="form-group" >
    <label for="exampleInputEmail1">Email address (optional)</label>
    <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text " style={{color:'grey'}}>We'll never share your email with anyone else.</small>
  </div>
  <button type="submit" class="btn btn-success" style={{marginTop:'20px'}}>మీరు సమాధానం తెలుసుకోవాలనుకుంటున్నారా</button>
</form>
        </div>
        </>
    )
}