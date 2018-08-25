import React, {Component} from 'react';
import PropTypes from 'prop-types';
import loadGoogleMapsAPI from 'load-google-maps-api';

//Styles
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../styles/sharedStyles.js';

const styles = (theme)=> {
  return {
    mapContainer:{
      display:'flex',
      flexDirection:'column',
      flexGrow:'1'
    },
    map:{
      display:'flex',
      width:'100%',
      flexGrow:'1'
    }
  }
}

const mapOptions = {
  center: {
    lat: -0.225219,
    lng: -78.5248
  },
  zoom: 16
};

const apiConfig = {
  key:'AIzaSyC3zMqvD8RoNadbq25lxlfjHEzDWaZb5nE'
};

class Map extends Component {

  componentDidMount(){
    loadGoogleMapsAPI( apiConfig ).then( googleMaps => {
      this.map = new googleMaps.Map( this.refs.map, mapOptions );
    }).catch( err => {
      console.warning( 'Hubo un error cargando el mapa', err );
    });
  }

  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.mapContainer}>
        <div ref="map" className={classes.map}></div>
      </div>
    )
  }

}

export default withStyles(styles)(Map);
