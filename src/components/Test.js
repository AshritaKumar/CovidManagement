import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Moment from 'moment';
import TextField from '@material-ui/core/TextField';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const NewDate = Moment(selectedDate).format('DD-MM-YYYY');
  const handleDateChange = (NewDate) => {
    setSelectedDate(NewDate);
  };

  return (
   <>
   <p> {NewDate}</p>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
       
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD-MM-YYYY"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={NewDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
   </>
  );
}
