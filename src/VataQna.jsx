import React, { useState } from "react";
import LanguageSelection from "./LanguageSelection";
import Quiz from "./Quiz";


export default function VataQna(){
    const [language, setLanguage] = useState("");

    return(
        <div style={{background:'#4E4FEB',margin:'0px',minWidth:'100%'}}>
        {language ? (
        <Quiz language={language} />
            ) : (
                <LanguageSelection onSelectLanguage={setLanguage} />
            )}
        </div>
    )
}