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

import MapView, { PROVIDER_GOOGLE, Marker , Polyline } from 'react-native-maps';
import RetroMapStyles from './RetroMapStyles.json';

// librerias de prueba
import Icon from 'react-native-vector-icons/FontAwesome';

import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.4220;
const LONGITUDE = -122.0840;
const LATITUDE_DELTA = 0.019122; // este valor se modifica para el zoom in y zoom out
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyB9M3BwX9Gw2h3Zb2XeVc8BHCu0Dl5v5W4';

import {getDistance} from './assets/utils/utils';
import Bubble from './Bubble';


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
    username:null,
    distance:null
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
     position => {
       console.log(position);
       this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
       error: null
      });
    },
    error => this.setState({ error: error.message }),
     { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
     );

     this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
  
      this.setState({lastPosition});
      console.log('last position: '+this.state.lastPosition)
  
    });
   }  

   onMapPress(event) {
  console.log("EVENTO: "+JSON.stringify(event))

  //  const feature = event
  //  // console.log('JSON feature', JSON.stringify(feature)); // eslint-disable-line
  //  // console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
   
  //  var distance=getDistance(
  //    event.coordinates.latitude,
  //    event.coordinates.longitude,
  //    this.state.userLatitude,
  //    this.state.userLongitude,
  //    'km'
  //  );

  //  this.setState({
  //    latitude: event.coordinates.latitude,
  //    longitude: event.coordinates.longitude,
  //    screenPointX: event.point.x,
  //    screenPointY: event.point.y,
  //    distance:distance.toFixed(2)
  //  });

  //  console.log("distancia: "+distance);
 }


 get hasValidLastClick() {
   return (
     typeof this.state.latitude === 'number' &&
     typeof this.state.longitude === 'number'
   );
 }


   renderLastClicked() {
    if (!this.hasValidLastClick) {
      // return (
      //   <Bubble>
      //     <Text>Click the map!</Text>
      //   </Bubble>
      // );
      return null
    }

    return (
      <Bubble>
        <Text>Username: {this.state.username}</Text>
        <Text>Distancia: {this.state.distance} mts</Text>
        {/* <Text>Longitude: {this.state.longitude}</Text>
        <Text>Screen Point X: {this.state.screenPointX}</Text>
        <Text>Screen Point Y: {this.state.screenPointY}</Text> */}
        <TouchableHighlight
            style={styles.submit}
            onPress={() => {}}
            underlayColor='#fff'>
            <Text style={[styles.submitText]}>Ir en Ayuda</Text>
          </TouchableHighlight>
      </Bubble>
    );
  }  
coordinate(){
  return {
    region: {
      latitude: 37.7665248,
      longitude: -122.4161628,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
  }
  cont=0;
  render() {
    return (
<View style={{ flex: 1 }}>
{/* <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  /> */}

             <MapView
                 provider={ PROVIDER_GOOGLE }
                 style={ styles.container }

                 
                 rotateEnabled={true}
                  // customMapStyle={ RetroMapStyles }
                showsUserLocation={true}
                showsCompass={true}
                showsMyLocationButton={false}
                 cacheEnabled={false}
                 region={       { latitude: 	37.7665248,
                  longitude:-122.4161628 ,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA}}
                  onPress={e => this.onMapPress(e)}
                // maps no muestra el marker UserLocation a menos que tenga los permisos
              
            >
 <Marker
 key={this.cont++}
          coordinate={ this.coordinate().region}
        >
          {console.log( 'aqui'+this.cont++)}
<Icon name="rocket" size={40} color="#900" />
          </Marker>
        
        {/* {console.log( this.coordinate().region)} */}

        <Marker
 key={this.cont++}
            coordinate={ {latitude: 37.8025259, longitude: -122.4577787 } }
        >
          {console.log( 'aqui'+this.cont++)}
<Icon name="rocket" size={40} color="#900" />
          </Marker>

  {/* <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={GOOGLE_MAPS_APIKEY}
  /> */}

<Polyline
		coordinates={[
			{ latitude: 37.8025259, longitude: -122.4351431 },
			{ latitude: 37.7896386, longitude: -122.421646 },
			{ latitude: 37.7665248, longitude: -122.4161628 },
			{ latitude: 37.7734153, longitude: -122.4577787 },
			{ latitude: 37.7948605, longitude: -122.4596065 }
		]}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>



            </MapView>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  submit:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingHorizontal:15,
    paddingVertical:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
  }
});