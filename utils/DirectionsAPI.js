//Automatically set to 'production' when published through Expo
var env = process.env.NODE_ENV || 'development';
// var env = 'production'
var config = require('../config')[env];

const apiKey = config.googleDirectionsAPI.key

export const disneylandDirections = () => {
	console.log("GOOGLE DIRECTIONS API KEY: ", apiKey)

	fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key='+apiKey)
		.then((res) => res.json())
		.then((resJson) => {
			console.log('RESPONSE: ', resJson)
		})
		.catch((err) => {
			console.error(err)
		})
}