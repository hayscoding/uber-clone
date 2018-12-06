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
			var polylineCoords = null;

			if (resJson.routes.length)
        polylineCoords = decode(resJson.routes[0].overview_polyline.points)

			console.log('POLYLINE COORDS: ', polylineCoords)
		})
		.catch((err) => {
			console.error(err)
		})
}


//Decodes encoded polyline strings returned from the Google Directions API
//Can find source at this url: https://github.com/react-native-community/react-native-maps/issues/929#issuecomment-271365235
const decode = (t,e) => {
	for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
}