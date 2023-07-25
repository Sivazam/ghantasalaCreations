import Footer from "./Footer";
import Navrbar from "./Navbar";
import data from "./projectsData"


export default function Projects(){
    return(
        <div className="Home">
            <Navrbar/>
                <h1 className="mainText" style={{fontSize:'2.3rem',margin:'1.2rem 0'}}>ప్రాజెక్టులు</h1>
                <div className="container">
                   
                    <div className="row">
                    <div style={{textAlign:'left'}}>
                <a href="https://forms.gle/EXvB63qU2aLG9b668">  <button className='btn btn-warning' style={{margin:'20px 40px',padding:'20px',fontFamily:'monospace',fontWeight:700,border:'2px white solid'}}>Register are now Open!!!</button></a>
                </div>
                        {data.map((x,i)=>{
                            console.log(x.image)
                            return(
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12" key={i} style={{textAlign:'center',margin:'0.7rem 0',justifyContent:'center',alignContent:'center'}}>
                                <div className="card cardHovers" style={{width: '18rem',height:'21rem',background:'rgba(41, 40, 40, 0.6)',color:'whitesmoke',margin:'0 auto',boxShadow:'rgba(41, 40, 40, 0.8) 10px 10px 5px'}}>
                                    <img style={{height:'10rem'}} src={(x.image)} className="card-img-top" alt={x.name} />
                                    <div className="card-body">
                                        <h5 className="card-title titleFont" style={{textAlign:'left',color:'white'}}>{x.name}</h5>
                                        <p className="card-text pText" style={{color:'#BDCDD6'}}>{(x.desc).slice(0,50) + " ... [Read more]"}</p>
                                        <a href="#" className="btn btn-warning" style={{width:'100%',color:'white',fontSize:'1.2rem',fontWeight:'600',marginTop:'10px'}} >Learn here</a>
                                    </div>
                                </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            <Footer/>

        </div>
    )
} 