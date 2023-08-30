import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Moment from 'moment';
import Divider from '@material-ui/core/Divider';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const [pincode, setPincode] = useState("110001");
  const [faq, setFaq] = useState([]);
  const [date, setDate] = useState(new Date());
   const NewDate = Moment(date).format('DD-MM-YYYY');
   
   useEffect(() => {
     SearchV();
   });
  const SearchV = () => {
      axios
      .get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pincode+'&date='+NewDate)
      .then((response) => {
        setFaq(response.data['sessions']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return(
    <div className="home">
    <div className="vaccine">
       <h3><i className="em em-syringe"></i>  Nearby Vaccine Center</h3>
    </div>
    <Form>
    <Form.Group>
      <Form.Control 
       size="lg" 
       maxLength={6}
       type="number"
       required
       placeholder="110001"
       onChange={event => setPincode(event.target.value)} />
      </Form.Group>
      <Form.Group>
      <Form.Label className="mt-2">
       <h3><EventOutlinedIcon /> Chose Date</h3>
       <Divider />
      </Form.Label>
      <Form.Control
      className="mt-3"
      placeholderText="Please select a date"
       size="lg" 
       type="date"
       required
       onChange={event => setDate(event.target.value)}
       />
      </Form.Group>
      </Form>
      <Button 
        className="mt-3" 
        variant="outlined" 
        color="primary"
        onClick={SearchV}
        >
        Search
      </Button>
     <div className={classes.root}>
      <Grid container spacing={3}>
      {faq.map((faq, index) => {
        return (
        <Grid key={index} item xs={12}>
          <Paper className={classes.paper}>
           <h3> {faq.error}</h3>
          <h6>{faq.date}</h6>
          <h2 className="question">{faq.name}</h2>
          <hr/>
          <p>{faq.address}</p>
          <hr/>
          <h4>
           <span className="badge badge-pill bg-primary">{faq.vaccine}</span>
          </h4>
          <h5>
          Available <span className="badge badge-pill bg-success"> {faq.available_capacity}
          </span>
          </h5>
          <p>
          <span className="badge badge-pill bg-danger">Min Age {faq.min_age_limit}</span> <span className="badge badge-pill bg-info">{faq.fee_type}</span>
          </p>
          </Paper>
        </Grid>
        );
      })}
     </Grid>
    </div>
    </div>
   )
}