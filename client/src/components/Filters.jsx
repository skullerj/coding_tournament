import React, {Component} from 'react';

//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../styles/sharedStyles.js';
import Typography from '@material-ui/core/Typography';

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
        <Typography variant="headline" color="text-secondary">Filtros (por implementar) </Typography>
      </div>
    )
  }

}

export default withStyles(styles)(Filters);
