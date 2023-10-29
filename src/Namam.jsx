import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navrbar from './Navbar';
import React, { useEffect } from 'react';

function Namam() {

    const phrases = [
        "శ్రీ శ్రీనివాసా గోవిందా",
        "శ్రీ వేంకటేశా గోవిందా",
        "భక్తవత్సలా గోవిందా",
        "భాగవతప్రియ గోవిందా",
        "నిత్యనిర్మలా గోవిందా",
        "నీలమేఘశ్యామ గోవిందా",
        "పురాణపురుషా గోవిందా",
        "పుండరీకాక్ష గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "నందనందనా గోవిందా",
        "నవనీతచోరా గోవిందా",
        "పశుపాలక శ్రీ గోవిందా",
        "పాపవిమోచన గోవిందా",
        "దుష్టసంహార గోవిందా",
        "దురితనివారణ గోవిందా",
        "శిష్టపరిపాలక గోవిందా",
        "కష్టనివారణ గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "వజ్రమకుటధర గోవిందా",
        "వరాహమూర్తివి గోవిందా",
        "గోపీజనలోల గోవిందా",
        "గోవర్ధనోద్ధార గోవిందా",
        "దశరథనందన గోవిందా",
        "దశముఖమర్దన గోవిందా",
        "పక్షివాహనా గోవిందా",
        "పాండవప్రియ గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "మత్స్యకూర్మ గోవిందా",
        "మధుసూధన హరి గోవిందా",
        "వరాహ నరసింహ గోవిందా",
        "వామన భృగురామ గోవిందా",
        "బలరామానుజ గోవిందా",
        "బౌద్ధ కల్కిధర గోవిందా",
        "వేణుగానప్రియ గోవిందా",
        "వేంకటరమణా గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "సీతానాయక గోవిందా",
        "శ్రితపరిపాలక గోవిందా",
        "దరిద్రజన పోషక గోవిందా",
        "ధర్మసంస్థాపక గోవిందా",
        "అనాథరక్షక గోవిందా",
        "ఆపద్భాందవ గోవిందా",
        "శరణాగతవత్సల గోవిందా",
        "కరుణాసాగర గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "కమలదళాక్ష గోవిందా",
        "కామితఫలదాత గోవిందా",
        "పాపవినాశక గోవిందా",
        "పాహి మురారే గోవిందా",
        "శ్రీ ముద్రాంకిత గోవిందా",
        "శ్రీ వత్సాంకిత గోవిందా",
        "ధరణీనాయక గోవిందా",
        "దినకరతేజా గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "పద్మావతీప్రియ గోవిందా",
        "ప్రసన్నమూర్తీ గోవిందా",
        "అభయహస్త ప్రదర్శక గోవిందా మత్స్యావతార గోవిందా",
        "శంఖచక్రధర గోవిందా",
        "శారంగగదాధర గోవిందా",
        "విరాజాతీర్ధస్థ గోవిందా",
        "విరోధిమర్ధన గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "సాలగ్రామశిలాలయ గోవిందా",
        "సత్యసంధ గోవిందా",
        "మాయామానుష గోవిందా",
        "మధుసూదన హరి గోవిందా",
        "పాతాళపంకజాలయ గోవిందా",
        "పాదమసీతే గోవిందా",
        "శ్రీ రంగాభిధాన గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "బద్రికాశ్రమ గోవిందా",
        "వాసుదేవ ప్రియ గోవిందా",
        "మథురావాసి గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "గోకులచంద్ర గోవిందా",
        "గోపీప్రాణనాథ గోవిందా",
        "గోపీమానస గోవిందా",
        "గోపీగీత గోవిందా",
        "గోపీకామనోహర గోవిందా",
        "గోపీమంగల గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "నరయణావతార గోవిందా",
        "నమనారాయణ గోవిందా",
        "శాంఖచూడానాయక గోవిందా",
        "వేణుగానాలోల గోవిందా",
        "విశ్వాదరపోషక గోవిందా",
        "ఆనందానందకర గోవిందా",
        "శ్రీ కృష్ణావతార గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "ద్వారకానాయక గోవిందా",
        "యదుకులనాయక గోవిందా",
        "మధురాపురనాయక గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా",
        "గోవిందా హరి గోవిందా గోకులనందన గోవిందా"
      ];

      useEffect(() => {
        // Generate random petals on page load
        const numPetals = 50; // Adjust the number of petals as needed
    
        for (let i = 0; i < numPetals; i++) {
          createPetal();
        }
    
        function createPetal() {
          const petal = document.createElement('div');
          petal.classList.add('petal');
          petal.style.left = `${Math.random() * 100}%`;
          petal.style.setProperty('--delay', Math.random() * 5); // Randomize delay
          document.querySelector('.petal-container').appendChild(petal);
    
          petal.addEventListener('animationiteration', () => {
            // Remove petals after they fall off the screen to conserve resources
            document.querySelector('.petal-container').removeChild(petal);
            createPetal(); // Create a new petal to replace the removed one
          });
        }
    
        return () => {
          // Clean up petals when the component unmounts
          const petals = document.querySelectorAll('.petal');
          petals.forEach((petal) => {
            document.querySelector('.petal-container').removeChild(petal);
          });
        };
      }, []);
    
      return (
        <div className="Home" style={{ minHeight: '130vh' }}>
          <Navrbar />
          <div className="petal-container"></div> {/* Container for petals */}
          <Container fluid="md">
            <Row>
              <Col style={{ textAlign: 'center', margin: '20px' }}>
                <h4
                  style={{
                    fontWeight: '900',
                    color: 'yellow',
                    WebkitTextStroke: '1px red',
                    fontSize: '2.5rem',
                  }}
                >
                    గోవింద నామావళి
                </h4>
              </Col>
            </Row>
            <Row>
              <Col style={{paddingBottom:'50px'}}>
                {phrases.map((phrase, index) => (
                  <span key={index} style={{}}>
                    <button className="btn btn-light" style={{ margin: '5px', borderRadius: '15px', fontWeight: '500' }}>
                      {phrase}
                    </button>
                  </span>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
  );
}

export default Namam;