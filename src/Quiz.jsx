import React, { useState } from "react";
import { Container, Typography, Slider, Button, ButtonBase } from "@mui/material";
import Badge from '@mui/material/Badge';

const questions = [
  {
    text: {
      english: "I will do my work faster with ease?",
      telugu: "నేను అత్యంత వేగంగా పని చేస్తాను?"
    }
  },
  {
    text: {
      english: "I have low rememebarance power and sometimes i even dont rememeber at all?",
      telugu: "నాకు జ్ఞాపక శక్తి కొంచెం తక్కువగా అనిపిస్తుంది ఒక్కోసారి త్వరగా గుర్తుకు రాదు ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నాలో మానసికంగా శారీరకంగా ఉత్సాహం జీవ చైతన్యం నిండి ఉంటాయి ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నేను సన్నగా నాజూకుగా ఉంటాను అంత తేలిగ్గా బరువు పెరగను చేతి మీద నరాలు బయటకు కనిపిస్తుటాయి ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "కొత్త విషయాలను అతి వేగంగా ఇష్టంగా నేర్చుకుంటాను ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నా నడక తీరు తేలికగా వేగంగా ఉంటుంది?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నిర్ణయాలు తీసుకోవటం నాకు కాస్త ఇబ్బందికరంగా ఉంటుంది వెంటనే ఏదీ చెప్పలేను?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "కడుపులో గ్యాస్ బాధకి విరేచన బద్దకానికి తేలికగా గురవుతాను?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నా చేతులు కాళ్లు చల్లబడుతూ ఉంటాయి ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "తరచుగా ఆత్రుతకి లేక చింతకి గురవుతూ ఉంటాను ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నేను చలి వాతావరణం తట్టుకోలేను ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నేను చాలా వేగంగా మాట్లాడుతాను ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నా మూడ్స్ తేలికగా మారుతాయి స్వభావరీత్యా నేను కొంత ఎమోషనల్గా ఉంటాను ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నిద్ర పట్టటం రాత్రి గాఢ నిద్రపోవటం నాకు తరుచుగా ఇబ్బందికరంగా ఉంటుంది ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నా చర్మం ప్రత్యేకించి చలికాలంలో బాగా పొడిగా ఉంటుంది ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నా మనసు చాలా చురుకుగా ఉంటుంది కొన్ని సమయాలలో విశ్రాంతి ఉండదు అది బాగా ఊహాత్మకంగా కూడా ఉంటుంది ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నా కదలికలు చాలా వేగంగా చురుగ్గా ఉంటాయి నాలో శక్తి ఉప్పొంగి వస్తుంది హఠాత్తుగా , వేగంగా ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "తేలికగా ఉద్వేగానికి  గురవుతాను ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నేను ఒక్కడినే ఉంటే నా ఆహారపు అలవాట్లు నిద్ర పద్ధతులు అపక్రమంగా వేరుగా ఉంటాయి ?"
    }
  },
  {
    text: {
      english: "What is the chemical symbol for gold?",
      telugu: "నేర్చుకోవడం , మరిచిపోవటం ఎక్కువగా జరుగుతుంది ?"
    }
  }
];

const Quiz = ({ language }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(0));
  const [finalScore, setFinalScore] = useState();
  const handleAnswerChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitFinal = () => {
    setFinalScore(totalScore);
  };

  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
  let scoreColor = "";

  switch (true) {
    case totalScore < 100:
      scoreColor = "Red";
      break;
    case totalScore < 150:
      scoreColor = "Orange";
      break;
    case totalScore < 180:
      scoreColor = "Yellow";
      break;
    case totalScore >= 181 && totalScore <= 200:
      scoreColor = "Green";
      break;
    default:
      scoreColor = "Black"; // Default color
  }
//   console.log(questions[])
  return (
    <Container className="App" style={{background:'#4E4FEB',margin:'0px',minWidth:'100%'}}>
      {finalScore ? (
        ""
      ) : (

        <div className="container" style={{height:'100vh',textAlign: "center",display:'grid',alignContent:'center',justifyContent:'center' ,padding:'40px'}}>
        <div style={{textAlign:'center'}}>
            <Badge color="success"  badgeContent={ `${currentQuestionIndex + 1} `}>
                <h4 style={{background:'black',color:'white',padding:'10px',borderRadius:'10px',border:"2px solid white"}}> Question {currentQuestionIndex + 1}</h4>
            </Badge>    
        </div>  
        
          <Typography variant="h6" sx={{background:'#fff',color:"black",padding:'20px',borderRadius:'50px',border:'3px solid black',margin:'15px 0',fontWeight:'600' }}>
            {questions[currentQuestionIndex].text[language]}
          </Typography>
          
          <Slider
            value={answers[currentQuestionIndex]}
            min={0}
            max={6}
            step={1}
            onChange={(event, value) => handleAnswerChange(value)}
            sx={{
              width: "80%",
              display: "block",
              margin: "0 auto",
              color: "#fff", 
              Number:''
            }}
          />
            <p style={{ textAlign: 'center', color: '#fff',fontWeight:'700',fontSize:'2rem' }}>{answers[currentQuestionIndex]}</p>

            <div style={{display:'flex', textAlign:'center',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
        {currentQuestionIndex >= 1 && (
          <Button
            variant="contained"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            style={{ minWidth:'100px',background:'red',color:'white'}}
          >
            Previous
          </Button>
           ) }
          {currentQuestionIndex !== questions.length - 1 && (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              style={{margin:'15px',minWidth:'100px',background:'green' }}

            >
              Next
            </Button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitFinal}
              style={{margin:'15px',minWidth:'100px',background:'green' }}
            >
              Submit
            </Button>
            
          )}
          </div>
        </div>
      )}
      {finalScore ? (
        <center style={{minHeight:'100vh',display:'grid',justifyContent:'center',alignContent:'center'}}>
          <Typography variant="h6">
            <h5 style={{color:'white',fontWeight:'500'}}>Your "వాత తత్వం" Score is : {totalScore}/120</h5>
            <p style={{color:'white',fontWeight:'300'}}>color : {scoreColor}</p>
            <Button
              variant="contained"
              sx={{background:"red"}}
              href="/"
            >
              Go Back
            </Button>
          </Typography>
        </center>
      ) : 
        ""
      }
    </Container>
  );
};

export default Quiz;
