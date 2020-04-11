// para usar mapa solo agrege dependencias en root build.gradle

          // supportLibVersion = "28.0.3"
          // googlePlayServicesVersion = "16.1.0"
          // androidMapsUtilsVersion = "0.5+"


// https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md
// https://github.com/react-native-community/react-native-maps/issues/3108
// https://codeburst.io/react-native-google-map-with-react-native-maps-572e3d3eee14

// https://codedaily.io/tutorials/9/Build-a-Map-with-Custom-Animated-Markers-and-Region-Focus-when-Content-is-Scrolled-in-React-Native




import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, PermissionsAndroid } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import RetroMapStyles from './RetroMapStyles.json';

// librerias de prueba
import Icon from 'react-native-vector-icons/FontAwesome';



let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.4220;
const LONGITUDE = -122.0840;
const LATITUDE_DELTA = 0.019122; // este valor se modifica para el zoom in y zoom out
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;




export default class App extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    
    };
  }

  
  
coordinate(){
  return {
    region: {
      latitude: -27.3667908,
      longitude: -70.331398,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
  }
  cont=0;
  render() {
    return (
<View style={{ flex: 1 }}>


            <MapView
                 provider={ PROVIDER_GOOGLE }
                 style={ styles.container }

                 
                 rotateEnabled={true}
                  // customMapStyle={ RetroMapStyles }
                showsUserLocation={true}
                showsCompass={true}
                showsMyLocationButton={false}
                 cacheEnabled={false}
                 region={       { latitude: 	-27.3667908,
                  longitude:-70.331398,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA}}

                // maps no muestra el marker UserLocation a menos que tenga los permisos
                onMapReady={() => {
                PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                  ).then(granted => {
                  // alert(granted) // just to ensure that permissions were granted
                });
                }}  
              
            >
 <Marker
 key={this.cont++}
          coordinate={ this.coordinate().region}
        >
          {console.log( 'aqui'+this.cont++)}
<Icon name="rocket" size={40} color="#900" />
          </Marker>
        
        {console.log( this.coordinate().region)}


            </MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});