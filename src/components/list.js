import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import {Helmet} from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    background: '#2B2D42'
  },
}));

function FAQ(props) {
  const [faq, setFaq] = useState([]);
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    getFAQs();
  }, []);

  const getFAQs = () => {
    axios
      .get('https://api.npoint.io/7b5e65891bc78abdff99')
      .then((response) => {
        setIsLoaded(true);
        setFaq(response.data['Sheet1']);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!isLoaded) {
    return <div className="home">
             <Helmet>
               <title>CoBeds West Bengal - Bed Availability Tracker </title>
             </Helmet>
            <div className="spinner-grow text-info" role="status">
            <span className="sr-only"></span>
            </div>
           </div>;
  } else {
  return (
    <div className="home">
     <Helmet>
        <title>CoBeds West Bengal - Bed Availability Tracker </title>
      </Helmet>
    <Container>
    <div className={classes.root}>
      <Grid container spacing={3}>
      {faq.map((faq, index) => {
        return (
        
        <Grid item xs={12} sm={6}>
          <Paper key={index} className=" p-3 mb-2 bg-dark text-white">
          <div className="question">
          <Link to={`../district/${faq.Slug}`}>{faq.District} <ArrowForwardOutlinedIcon /></Link>
          </div>
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

export default FAQ;