export default function OwnQuetion(){
    return(
        <div className="container-fluid  mainContainer ">
        <div className="row lm90">
            <h1 className="mainText" style={{textAlign:"center",margin:'50px 0'}}>(OR)</h1>
        <h4 className="mainText">If the above question's arent the one you want to know. enter your own question below</h4>
        <textarea  className="mainText card-main" style={{fontWeight:800}}></textarea>
        <span style={{textAlign:'center', justifyContent:'center'}}>
        <button type="submit" class="btn btn-success" style={{marginTop:'20px',width:'auto',fontSize:'1rem'}}>మీరు సమాధానం తెలుసుకోవాలనుకుంటున్నారా</button>
        </span>
    </div>
  </div>
    )
}