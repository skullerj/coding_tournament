import React, {Component} from 'react';
import PropTypes from 'prop-types';

//UI Components
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../styles/sharedStyles.js';

const styles = theme =>{
  return {
    ...sharedStyles(theme)
  }
};

class Form extends Component {

  constructor(props){
    super(props);
    this.handleReadImportedFile=this.handleReadImportedFile.bind(this);
    this.handleChange=this.handleChange.bind(this)
    this.state={
      description:'',

      location:{
        lat:null,
        lon:null
      }
    };
  }

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.vertical}>

        <TextField
          label="¿Qué pasó?"
          multiline
          rowsMax="4"
          value={this.state.description}
          onChange={(e)=>{this.handleChange(e,'description')}}
          className={classes.textField}
          margin="normal"
        />

        <input
          id="file"
          type="file"
          onChange={this.handleReadImportedFile}
          style={{
            width: 0,
            height: 0,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: 1,
          }}
        />
        <Button component="label" htmlFor="file">
          Choose a file
        </Button>
      </div>
    )
  }

  handleChange(e,name){
    let val = e.target.value;
    this.setState({[name]:val});
  }

  handleReadImportedFile(e){
    e.preventDefault;
    console.log(e);
  }

}

export default withStyles(styles)(Form);
