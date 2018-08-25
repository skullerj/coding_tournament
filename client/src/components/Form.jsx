import React, {Component} from 'react';
import 'date-utils';
//UI Components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../styles/sharedStyles.js';

const styles = theme =>{
  return {
    ...sharedStyles(theme),
    inputField:{
      marginBottom:16
    },
    title:{
      marginBottom:24,
      color:theme.palette.primary.normal
    }
  }
};

class Form extends Component {

  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this)
    this.state={
      description:'',
      type:'',
      date:new Date()
    };
  }

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.vertical}>
        <Typography className={classes.title} align="center" variant="title">Mueve el mapa para seleccionar tu ubicación</Typography>
        <TextField
          label="¿Qué pasó?"
          multiline
          rowsMax="4"
          value={this.state.description}
          onChange={(e)=>{this.handleChange(e,'description')}}
          className={classes.inputField}
          margin="normal"
        />
        <FormControl className={classes.inputField}>
          <InputLabel htmlFor="age-simple">Tipo</InputLabel>
          <Select
            value={this.state.type}
            onChange={(e)=>{this.handleChange(e,'type')}}
            inputProps={{
              name: 'type',
              id: 'type-selector',
            }}
          >
            <MenuItem value={'carAccident'}>Accidente de auto</MenuItem>
            <MenuItem value={'battery'}>Agresión</MenuItem>
            <MenuItem value={'murder'}>Asesinato</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="date"
          label="¿Cuando sucedió?"
          type="date"
          defaultValue={(new Date()).toFormat('YYYY-MM-DD')}
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.inputField}
        />
        <Button variant="contained" color="primary" onClick={()=>{this.props.onSubmit(this.state)}}>Enviar</Button>
      </div>
    )
  }

  handleChange(e,name){
    let val = e.target.value;
    this.setState({[name]:val});
  }


}

export default withStyles(styles)(Form);
