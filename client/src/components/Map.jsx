import React, {Component} from 'react';
import PropTypes from 'prop-types';
import loadGoogleMapsAPI from 'load-google-maps-api';

const mapStyles = {
  height: '450px',
  width: '100%'
}

const mapOptions = {
  center: {
    lat: 41.4054682,
    lng: 2.12373473
  },
  zoom: 16
};

const apiConfig = {
  key:'AIzaSyDE2XTOO3mc5CnZSdfeesVG0xVfs8L9DidM__0'
};

class Map extends Component {

  componentDidMount(){
    loadGoogleMapsAPI( apiConfig ).then( googleMaps => {
      this.map = new googleMaps.Map( this.refs.map, mapOptions );
    }).catch( err => {
      console.warning( 'Hubo un error cargando el mapa', err );
    });
  }

  render(){
    return (<div ref="map" style={mapStyles}>

    </div>)
  }

}

export default Map;
