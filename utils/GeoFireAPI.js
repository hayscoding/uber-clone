import firebase from 'firebase'
import geofire from 'geofire'

//Automatically set to 'production' when published through Expo
var env = process.env.NODE_ENV || 'development';
// var env = 'production'
var config = require('../config')[env];

const firebaseRef = firebase.database().ref();
const geoFire = new GeoFire(firebaseRef.child('./geoData'));

/*
#######################################################
--------------     DATABASE FUNCTIONS    --------------
#######################################################
*/



/*
#######################################################
--------------      QUERY FUNCTIONS      --------------
#######################################################
*/

export function createQueryAtLocation(lat, lon) {

}