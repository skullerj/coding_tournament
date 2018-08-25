import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom';
import 'date-utils';
//UI components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../styles/sharedStyles.js';

const styles = theme=>({
  ...sharedStyles(theme),
  eventCard:{
    margin:8
  }
});

class List extends Component {

  render(){
    const {events} = this.props;
    const {classes} = this.props;
    return (
      <div className={classes.eventsContainer}>
        {events.map((event)=>(
          <Card className={classes.eventCard} key={event.id}>
            <CardContent >
              <Typography variant="caption" color="textSecondary">{this.parseType(event.type)}</Typography>
              <Typography>{event.description}</Typography>
            </CardContent>
            <CardActions className={classes.horizontal}>
              <Typography variant="caption">{(new Date(event.date)).toFormat('YYYY-MM-DD')}</Typography>
              <div className={classes.flex}></div>
              <Button onClick={this.props.onDetailsClick} color="secondary">Detalles</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    )
  }

  parseType(type){
    switch (type) {
      case 'carAccident':
        return 'Accidente de auto';
      case 'battery':
        return 'Agresión';
      case 'murder':
        return 'Asesinato';
      default:
        return '';
    }
  }
}




export default withStyles(styles)(List);
