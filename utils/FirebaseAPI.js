//Automatically set to 'production' when published through Expo
var env = process.env.NODE_ENV || 'development';
// var env = 'production'
var config = require('../config')[env];

const apiKey = config.firebase.key


// var phoneNumber = getPhoneNumberFromUserInput();
// var appVerifier = window.recaptchaVerifier;
// firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then(function (confirmationResult) {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//     }).catch(function (error) {
//       // Error; SMS not sent
//       // ...
//     });