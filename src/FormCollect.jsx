import React from "react";

export default function FormCollect(){
    return(
        <div style={{  background: "rgba(41, 40, 40, 0.6)" ,  color:'white', padding:'30px 0px', margin:'50px 0px ', marginLeft:'20px'}}>
           <form style={{padding:'30px'}}>
  {/* <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div> */}
   <div class="form-group">
    <label for="exampleInputPassword1">Full Name *</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Full Name" />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Gotram *</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Gotram" />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Birth Date *</label>
    <input type="date" class="form-control" id="exampleInputPassword1" placeholder="Birth date" />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Birth Time *</label>
    <input type="time" class="form-control" id="exampleInputPassword1" placeholder="Birth time" />
  </div>
 
  {/* <div class="form-group">
    <label for="exampleInputPassword1">Question *</label>
    <textarea type="text" class="form-control" id="exampleInputPassword1" placeholder="Please enter Your Question" />
  </div> */}
  <div class="form-group">
    <label for="exampleInputPassword1">Contact Number *</label>
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Mobile Number" />
  </div>
  <div class="form-group" >
    <label for="exampleInputEmail1">Email address (optional)</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text " style={{color:'grey'}}>We'll never share your email with anyone else.</small>
  </div>
 
  <button type="submit" class="btn btn-success" style={{marginTop:'20px'}}>Submit</button>
</form>
        </div>
    )
}