import React, {useState, useEffect} from 'react';
import numeral from "numeral";

import {Container, Row, Col} from 'react-bootstrap';
export default function Stats (props) {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const formatStr = "0,0";
  
  useEffect( () => {
    getCovidStats();
  }, []);
  
  const getCovidStats = async () => {
    try {
    const response = await fetch('https://api.covid19india.org/data.json');
    setIsLoaded(true);
    const resdata = await response.json();
    setData(resdata.statewise[37]);
  } catch (error) {
    setIsLoaded(true);
    console.log("my error is "+ error);
    }
 }
  if(!isLoaded) {
    return (
      <>
      <p>Loading</p>
      </>
      );
  } else {
  return(
    <>
     <Container className="shadow-lg mt-3">
        <Row>
         <Col className="">
         <div className="card text-white bg-danger mt-3 mb-3">
          <div className="card-header">Active</div>
          <div className="card-body">
           {numeral(data.active).format(formatStr)}
          </div>
         </div>
         </Col>
         <Col className="">
         <div className="card text-white bg-success mt-3 mb-3">
          <div className="card-header">Recovery</div>
          <div className="card-body">
          {numeral(data.recovered).format(formatStr)}
          </div>
         </div>
         </Col>
         <Col className="">
         <div className="card text-white bg-dark mt-3 mb-3">
          <div className="card-header">Deaths</div>
          <div className="card-body">
          {numeral(data.deaths).format(formatStr)}
          </div>
         </div>
         </Col>
        </Row>
      </Container>
    </>
    )
  }
}