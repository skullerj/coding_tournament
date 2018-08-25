import React, {Component} from 'react';
import PropTypes from 'prop-types';

//UI Components
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../styles/sharedStyles.js';

const styles = theme =>{
  return {

  }
};

class Event extends Component {

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.formContainer}>

      </div>
    )
  }


}

export default withStyles(styles)(Event);
