import React, {Component} from 'react';

//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../styles/sharedStyles.js';

const styles = (theme)=> {
  return {
    bar:{
      ...theme.mixins.toolbar,
      backgroundColor:theme.palette.background.default
    }
  }
}

class Filters extends Component {

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.bar}>
        <h1>Hola mundo</h1>
      </div>
    )
  }

}

export default withStyles(styles)(Filters);
