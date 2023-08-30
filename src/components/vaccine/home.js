import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';


function FAQ(props) {
  const [district, setDistrict] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    getDistricts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getDistricts = () => {
    axios
      .get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/36')
      .then((response) => {
        setDistrict(response.data['districts']);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!isLoaded) {
    return <div className="home">
           <div className="spinner-grow text-info" role="status">
            <span className="sr-only"></span>
            </div>
           </div>;
  } else {
  return (
    <div className="mt-3">
    <Table striped bordered hover>
    <thead>
    <tr>
      <th>District</th>
      <th>Availability</th>
    </tr>
    </thead>
    <tbody>
      {district.map((item, index) => {
        return (
          <tr key={index}>
            <td>
            <h4>
               <span className="">{item.district_name}</span>
               </h4>
            </td>
            <td>
             <h3>
             <Link to={`../vaccine/wb/${item.district_id}`}>
               <span className="badge bg-success">Click</span>
               </Link>
               </h3>
            </td>
          </tr>
        );
      })}
      </tbody>
     </Table>
    </div>
  );
  }
}

export default FAQ;