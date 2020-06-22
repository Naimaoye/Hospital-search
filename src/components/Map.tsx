import React from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";

const mapStyles = {
    width: '100%',
  };

const ShowMap: React.FC<any> = ({ google }) => {
    // const classes = styles();
    return (
        <div>
        <Map
          google={google}
        // zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 6.524379, lng: 3.379206}}
        />
        </div>
    );

}

// export default ShowMap;

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAygwpWXT69_9U_ZFVu33ibH5E8g4D18Z0'
  })(ShowMap);
