/*
<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
----------------------------------------------------------------
    Author: Hays Stanford
    Website: www.haysstanford.com
    Github: github.com/HaysS
    Twitter: twitter.com/thehaysstanford
----------------------------------------------------------------
<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
*/
import firebase from 'firebase'
import GeoFire from 'geofire'
import { Location } from 'expo'

//Automatically set to 'production' when published through Expo
var env = process.env.NODE_ENV || 'development';
// var env = 'production'
var config = require('../config')[env];

// const firebaseRef = firebase.database().ref();
// const geoFire = new GeoFire(firebaseRef.child('./geoData'));

const OPTIONS = {
	enableHighAccuracy: true,
	timeInterval: 100000,
	distanceInterval: 3000,
}

/*
#######################################################
--------------     DATABASE FUNCTIONS    --------------
#######################################################
*/

// export const watchLocationAsync = async (cb) => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);

//     if (status !== 'granted') {
//       this.setState({
//         errorMessage: 'Permission to access location was denied',
//       });
//     }

//     let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

//     this.setState({location: location,  region: this.getRegionFromLocation(location)});
//   };
// }

export const watchLocation =  (uid) => {
	console.log('watchLocation()')
	return Location.watchPositionAsync(OPTIONS, (pos) => {
		setUserCoord(uid, pos.coords.latitude, pos.coords.longitude)
	})
}

export const setUserCoord = (uid, lat, lon) => {
	console.log('setUserCoord()')
	const firebaseRef = firebase.database().ref()
	const geoFire = new GeoFire(firebaseRef.child('geoData/'))

	geoFire.set(uid, [lat, lon])
		.then(() => {
			console.log("Key has been added to GeoFire");
		}, (error) => {
			console.log("Error: " + error);
		}
	)
}


/*
#######################################################
--------------      QUERY FUNCTIONS      --------------
#######################################################
*/

export function createQueryAtLocation(lat, lon) {

}