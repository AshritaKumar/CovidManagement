import React, {useState, useEffect} from 'react'
import {Table, Container , Row , Col} from 'react-bootstrap'
export default function OxyHome(props) {
  const [oxyz, setOxyz] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
        getUsers();
    }, []);
    
  const getUsers = async () => {
        try {
            const response = await fetch('https://covidwb.com/data/covidwb.com/oxygen_data.json');
             setLoading(false);
            setOxyz(await response.json());
        } catch (error) {
            setLoading(false);
            console.log("my error is "+ error);
        }
    }
  console.log(oxyz)
  return (
    <div className="home">
     <h4>Hello</h4>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
         <th>Supplier</th>
         <th>Available</th>
         <th>First Name</th>
        </tr>
      </thead>
     <tbody>
      {oxyz.map((item, index) => { 
        return (
        <tr key={index}>
          <td>
           <p style={{fontWeight: 'bold'}}> {item.name}</p>
           <p>{item.area} , {item.city}</p>
           <p className="badge bg-info">{item.phone}</p>
          </td>
          <td>{item.available === "true" ? ( 
            <>
            <p>yes</p>
            </> ) : ( <><p>no</p></> )}
          </td>
          <td>Verified</td>
        </tr>
         );
      })}
  </tbody>
</Table>
    </div>
    );
}



//https://covidwb.com/data/covidwb.com/oxygen_data.json