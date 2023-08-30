import React, {useState, useEffect} from 'react';
import Moment from 'moment';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '10px'
  },
}));
export default function VaccineDistrict (props) {
  const [date, setDate] = useState(new Date());
  const NewDate = Moment(date).format('DD-MM-YYYY');
  const [faq, setFaq] = useState([]);
   let stateid = props.match.params.id;
 const classes = useStyles();
 const [isLoaded, setIsLoaded] = useState(false);
 
 useEffect(() => {
    getVdists();
  }, );
 
  const getVdists = () => {
    axios
      .get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id='+stateid+'&date='+NewDate)
      .then((response) => {
        setIsLoaded(true);
        setFaq(response.data['centers']);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!isLoaded) {
    return <div className="home">
           <div className="spinner-grow text-primary" role="status">
  <span className="sr-only"></span>
</div>
           </div>;
  } else {
   return(
     <div className="home">
     <Container>
     <Alert severity="info"> If Blank comes, you can change the date.</Alert>
     
      <Form.Group className="cdate">
      <Form.Label className="mt-2">
       <h3><EventOutlinedIcon /> Chose Date</h3>
       <Divider />
      </Form.Label>
      <Form.Control
      className="mt-3"
       size="lg" 
       type="date"
       onChange={event => setDate(event.target.value)} />
      </Form.Group>
       <Button 
        className="mt-3" 
        variant="outlined" 
        color="primary"
        onClick={getVdists}
        >
        Change Date
      </Button>
      <br/>
      <Box color="text.primary" clone>
      <div className={classes.root}>
       <Grid borderColor="primary.main" container spacing={3}>
       <Grid item xs={6} sm={3}>
          <span className="badge bg-warning text-dark">{' '}</span><strong> Vaccination Date</strong>
        </Grid>
        <Grid item xs={6} sm={3}>
          <p>
          <span className="badge bg-danger">{' '}</span> <strong> Minimum Age </strong>
          </p>
        </Grid>
        <Grid item xs={6} sm={3}>
          <p>
          <span className="badge bg-success">{' '}</span> <strong>Available Vaccination</strong>
          </p>
        </Grid>
        <Grid item xs={6} sm={3}>
          <span className="badge bg-info text-light">{' '}</span> <strong> Vaccination Time Slots</strong>
        </Grid>
       </Grid>
      </div>
     </Box>
     <div className={classes.root}>
      <Grid container spacing={3}>
        {faq.map((faq, index) => {
         //const AM = faq.sessions[0].slot.replace("AM", " AM");
         const vslot = (faq.sessions[0].slots);
         
          return (
          <Grid key={index} item xs={12}>
          <Paper className={classes.paper}>
           <p><span className="badge bg-warning text-dark">
           {faq.sessions[0].date}
           </span>
           </p>
          <>
          <i className="em em-hospital"></i>
          <h2 className="hos">{faq.name}</h2>
          </>
          <p><i className="em em-round_pushpin"></i> {faq.address}</p>
           <h5>
           <i className="em em-mask"> </i> <span className="badge bg-danger"> {faq.sessions[0].min_age_limit}</span>
          </h5>
          <h3>
          <span className="badge bg-light text-dark">
          {faq.sessions[0].vaccine}</span>
          </h3>
          <h4>
          <i className="em em-syringe"></i>
          <span className="badge bg-success">
          {faq.sessions[0].available_capacity}</span></h4>
          <p className="slots bg-info text-light">{vslot}</p>
         </Paper>
        </Grid>
        );
        })}
      </Grid>
    </div>
    </Container>
     </div>
     );
  }
}