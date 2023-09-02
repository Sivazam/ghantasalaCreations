import React, { useState } from "react";
import { Button, Container, Grid } from "@mui/material";


export default function LanguageSelection({onSelectLanguage}){
    return(
        <Container>
        
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
            <Grid style={{position:"absolute",top:'20%'}}>
            <h2 style={{textAlign:'center',color:'white',fontWeight:'700'}}>Select your preferred Language</h2>

        </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{background:"#35155D"}}
              disabled={true}
              onClick={() => onSelectLanguage("english")}
            >
              English
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{background:"#35155D"}}
              onClick={() => onSelectLanguage("telugu")}
            >
              Telugu
            </Button>
          </Grid> <Grid item>
            <Button
              variant="contained"
              sx={{background:"#35155D"}}
              id="hovBtn"
              disabled={true}
              onClick={() => onSelectLanguage("Hindi")}
            >
              Hindi
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
}
