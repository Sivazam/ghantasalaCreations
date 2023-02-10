import React from "react";
import qna from './Questions'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function Cards(){
    return(
        <div className="container-fluid  mainContainer ">
            <div className="row lm90">
                {qna.map((x,i) => {
                    return (<>
                     <div className="col-xl-5 col-md-12  col-sm-12 col-xs-12 card-main" data-bs-toggle="modal" data-bs-target="#exampleModal" key={i} >
                        <h4 className="mainText" style={{fontWeight:800}} key={i}>{x}</h4>

                                                
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" key={i}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content" style={{background: "rgba(13, 13, 13, 0.861)"}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Mee prashna</h5>
                                <button style={{background:"rgba(13, 13, 13, 0.861)"}} type="button" className="" data-bs-dismiss="modal" aria-label="Close"><CloseOutlinedIcon style={{color:'red',background:"rgba(13, 13, 13, 0.861)"}}/></button>
                            </div>
                            
                            <div className="modal-body" style={{}}>
                                <h4 className="mainText" style={{fontWeight:800}} key={i}>{x}</h4>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success">Know the answer</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                

                </>)
                })}
               
         

            </div>

          
        </div>
    )
}