import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GTranslateOutlinedIcon from '@material-ui/icons/GTranslateOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import * as Icon from 'react-feather';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
  },
  appBar : {
    background : "#2B2D42",
    color : "#fff",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
        <GTranslateOutlinedIcon />
          <Typography color="inherit" variant = "h4" className={classes.title}>
            CoBeds
          </Typography>
          <InfoOutlinedIcon
            onClick={handleClickOpen}
            />
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"CoBeds West Bengal - Bed Availability Tracker"}</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-center" id="alert-dialog-slide-description">
          <div className="fadeInUp" style={{animationDelay: '2s'}}>
            <Button variant="outlined" color="primary">
            <Icon.Terminal /> Made By Arjun
            </Button>
            <Button className="mt-3" variant="outlined">
            <Icon.Coffee /><span style={{marginLeft: "2px"}}> Contribute</span>
            </Button>
          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
