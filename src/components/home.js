import React from 'react';
import {Container} from 'react-bootstrap';
//import Button from '@material-ui/core/Button';
import VaccineDistrict from './vaccine/home';
import VaccineSearch from './vaccine/search';
//import Test from './Test'
export default function Home(props) {
  
  //const SearchV = () => alert("System Disabled");
  return(
    <div className="home">
    <Container>
    <VaccineSearch />
     <VaccineDistrict />
     </Container>
    
    </div>
   )
}