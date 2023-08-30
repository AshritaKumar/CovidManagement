import React, {Fragment} from 'react';
import {Carousel,Container, Row, Col} from 'react-bootstrap';
import {sliders} from '../utils/sliders';
import Stats from './stats'
import bed from '../assets/hospital-bed.png';
import hospital from '../assets/hospital.png';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Link} from 'react-router-dom';

 export default function Main (props) {
   return(
     <Fragment>
       <div className="home">
         <Carousel
          controls={false}
          indicators={false}
          fade={true}>
        {sliders.map(item => (
           <Carousel.Item key={item.id}>
           <img
             className="img-fluid img-thumbnail"
             src={item.url}
              alt={item.name}
              />
          </Carousel.Item>
        ))}
       </Carousel>
       <div className="mt-4 fadeInUp" style={{ animationDelay: "3s"}}>
       <h2 className="wb_ncov">West Bengal Covid Case's</h2>
      </div>
        <Stats 
         className="fadeInUp"
          style={{ animationDelay: "5s"}}/>
      <Container>
       <Row className="mt-3">
         <Col>
          <div className="shadow card ">
            <div className="card-body">
              <img className="img-fluid" src={bed} alt="Find Beds" />
                Find Nearby COVID Hospital
            <Link to="/list">
              <Button 
              className="mt-2"
               variant="outlined" 
               color="primary">
                <ArrowForwardIcon />
               </Button>
            </Link>
            </div>
          </div>
         </Col>
         <Col>
         <div className="shadow card">
            <div className="card-body">
             <img className="img-fluid" src={hospital} alt="Find Vaccine Center" />
               Find Nearby Vaccine Center
            <Link to="/vaccine">
              <Button 
              className="mt-2"
               variant="outlined" 
               color="primary">
                <ArrowForwardIcon />
               </Button> 
            </Link>
            </div>
          </div>
         </Col>
       </Row>
      </Container>
    </div>
     </Fragment>
     )
 }