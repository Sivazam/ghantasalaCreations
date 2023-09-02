import { Button, Input } from "@mui/material"
import { useState } from "react"

function House({cName,bg}){
    const [Name,setName] = useState()

    function HandleSubmit(e){
        // console.log("Name>",e.target.value)
        e.preventDefault();



        if (
          Name.startsWith('aa') ||
          Name.startsWith('ae') ||
          Name.startsWith('ai') ||
          Name.startsWith('ao') ||
          Name.startsWith('au') ||

          Name.startsWith('aaa') ||
          Name.startsWith('e') ||
          Name.startsWith('ea') ||
          Name.startsWith('ee') ||
          Name.startsWith('ei') ||
          Name.startsWith('eo') ||
          Name.startsWith('eu') ||

          Name.startsWith('eee') ||
          Name.startsWith('ua') ||
          Name.startsWith('ue') ||
          Name.startsWith('ui') ||
          Name.startsWith('uo') ||
          Name.startsWith('u') ||


          Name.startsWith('uu') ||
          Name.startsWith('ru') ||
          Name.startsWith('ruu') ||
          Name.startsWith('a') ||
          Name.startsWith('i') ||
          Name.startsWith('o') ||
          Name.startsWith('oo') ||
          Name.startsWith('ou') ||
          Name.startsWith('aum') ||
          Name.startsWith('aah')
        ) {
          alert("AA Vargu - >  East ,West and South Facing");
        } else if (
            Name.startsWith('ka') ||
            Name.startsWith('ke') ||
            Name.startsWith('ki') ||
            Name.startsWith('ko') ||
            Name.startsWith('ku') ||
            Name.startsWith('kha') ||
            Name.startsWith('ga') ||
            Name.startsWith('gha') ||
            Name.startsWith('jna')
        ) {
          alert("KA Vargu -> South and West Facing");
        } else if (
          Name.startsWith('cha') ||
          Name.startsWith('chaa') ||
          Name.startsWith('ja') ||
          Name.startsWith('jha') ||
          Name.startsWith('na')
        ) {
          alert("Cha Vargu -> East, North and West Facing");
        } else if (
          Name.startsWith('tha') ||
          Name.startsWith('thaa') ||
          Name.startsWith('dha') ||
          Name.startsWith('dhaa') ||
          Name.startsWith('na')
        ) {
          alert("Ta Vargu -> East and North Facing");
        // }  else if (
        //     Name.startsWith('Tha') ||
        //     Name.startsWith('Thaa') ||
        //     Name.startsWith('Dha') ||
        //     Name.startsWith('Na')
        //   ) {
        //     alert("Tha Vargu -> West Facing");
        //   }
         } else if (
            Name.startsWith('pa') ||
            Name.startsWith('p') ||
            Name.startsWith('pha') ||
          Name.startsWith('ba') ||
          Name.startsWith('bha') ||
          Name.startsWith('ma')
        ) {
          alert("Pa Vargu -> East and North Facing");
        } else if (
          Name.startsWith('ya') ||
          Name.startsWith('ra') ||
          Name.startsWith('la') ||
          Name.startsWith('va') ||
          Name.startsWith('ve') ||
          Name.startsWith('vi') ||
          Name.startsWith('vo') ||
          Name.startsWith('vu')
        ) {
          alert("Ya Vargu -> East, West and South Facing");
        } else if (
          Name.startsWith('sa') ||
          Name.startsWith('sha') ||
          Name.startsWith('s') ||
          Name.startsWith('haa') ||
          Name.startsWith('ha') ||
          Name.startsWith('la') ||
          Name.startsWith('kshya')
        ) {
          alert("SA Vargu -> South and East Facing");
        } else {
          alert("Unknown Error - Contact Admin");
        }
        

    }
    return(
        <div  className={bg} style={{minHeight:'100vh',color:'white'}} >
        <div style={{paddingTop:'10%'}}>
           <center>
            <h4>House Vasthu</h4>
                <form onSubmit={HandleSubmit}>

                    <Input 
                    name="Name"
                    sx={{mt:4,color:'white'}}
                    placeholder="Enter your Name"
                    onChange={e => (setName(e.target.value))}
                    required
                    />
                    <Button variant="outlined" type="Submit" sx={{color:'white'}}>Submit</Button>
                </form>

</center>       
 </div>
 </div>
    )

}

export default House;