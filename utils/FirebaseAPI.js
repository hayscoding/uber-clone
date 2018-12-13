import firebase from 'firebase'

//Automatically set to 'production' when published through Expo
var env = process.env.NODE_ENV || 'development';
// var env = 'production'
var config = require('../config')[env];

export function createUser(email, password, cb) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then( cb() )
      .catch(error => this.setState({ errorMessage: error.message }))
  }


// export function setInvisibleRecaptcha() {
// 	console.log('setInvisibleRecaptcha() called.')
// 	window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
// 	  'size': 'invisible',
// 	  'callback': function(response) {
// 	    // reCAPTCHA solved, allow signInWithPhoneNumber.
// 	    console.log('invisible reCAPTCHA success.')
// 	    onSignInSubmit();
// 	  }
// 	});
// }

// export function signInWithPhoneNumber() {
// 	var phoneNumber = '5555555555';
// 	var appVerifier = window.recaptchaVerifier;

// 	firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
// 	    .then(function (confirmationResult) {
// 	      // SMS sent. Prompt user to type the code from the message, then sign the
// 	      // user in with confirmationResult.confirm(code).
// 	      console.log('firebase signInWithPhoneNumber: Success.')
// 	      window.confirmationResult = confirmationResult;
// 	    }).catch(function (error) {
// 	      // Error; SMS not sent
// 	      // ...
// 	      console.log('firebase signInWithPhoneNumber: Error, here is msg: ', error)
// 	    });
// }
// 	