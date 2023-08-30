import React,{useState, useEffect} from 'react';
import {Table, Container, Row, Col} from 'react-bootstrap'
import Alert from '@material-ui/lab/Alert';

//import moment from 'moment';
import timeago from 'epoch-timeago';

export default function Home (props) {
const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  //Props
  let district = props.match.params.pin;
  let districtspace = district.split("-").join(" ");
  let District = capitalizeTheFirstLetterOfEachWord(districtspace);
  
  // Capital 
 function capitalizeTheFirstLetterOfEachWord(words) {
   var separateWord = words.toLowerCase().split(' ');
   for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
      separateWord[i].substring(1);
   }
   return separateWord.join(' ');
}

  useEffect(() => {
    fetch("https://covidwb.com/data/covidwb.com/bed_data.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="home">
           <div class="spinner-grow text-info" role="status">
            <span class="sr-only"></span>
            </div>
           </div>;
  } else {
    return (
      <div className="home">
      <Container>  
       <Row>
         <Col>
          <h1 className="district_name"><i class="em em-mask"></i> {District}</h1>
         </Col>
         <Col>
         <div className="name_indi">
          <h6>
            <span class="badge bg-warning">{''} </span> Remaining Resources 
          </h6>
          <h6>
          <span class="badge bg-success">{''} </span> Total Allotted Resources
          </h6>
         </div>
         </Col>
       </Row>
       <Alert className="mt-2 mb-2" severity="info">Data may be delayed or partial. Please verify with the hospital.</Alert>
      </Container>
   
     <Table striped bordered hover>
       <thead>
         <tr>
           <th>
           COVID Hospital Details
           </th>
           <th>Total COVID Beds</th>
           <th>Total Oxygen Beds</th>
           <th>Total ICU Beds</th>
         </tr>
        </thead>
      <tbody>
        {items && items.filter(item => item.pincode === District).map((item, index) => { 
        //const unix = Number(item.last_updated_on) + Number('19800');
        //const timem = moment.unix(unix);
        // const update = timem.format('LT');
        const timeSince = timeago(item.last_updated_on - 60000 * 10);
        const update = timeSince.split("51 years ago").join("unknown")
        return(
        <tr>
         <td>
          <strong>{item.hospital_name}</strong>
           <br/>
          <p><span className="badge bg-secondary"> {update} </span></p>
          </td>
          <td>
           <h1>
             <span class="badge bg-warning">
             {item.available_beds_allocated_to_covid}
             </span>
            </h1>
          <h1>
          <span class="badge bg-success">
          {item.total_beds_allocated_to_covid}
          </span>
          </h1>
          </td>
          <td>
          <h1>
             <span class="badge bg-warning">
             {item.available_beds_with_oxygen}
             </span>
            </h1>
          <h1>
          <span class="badge bg-success">
          {item.total_beds_with_oxygen}
          </span>
          </h1>
          </td>
          <td>
          <h1>
             <span class="badge bg-warning">
             {item.available_icu_beds_without_ventilator}
             </span>
            </h1>
          <h1>
          <span class="badge bg-success">
          {item.total_icu_beds_without_ventilator}
          </span>
          </h1>
          </td>
        </tr>
        )})}
      </tbody>
    </Table>
   </div>
    );
  }
}