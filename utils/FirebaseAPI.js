/*
<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
----------------------------------------------------------------
    Author: Hays Stanford
    Website: www.haysstanford.com
    Github: github.com/HaysS
    Twitter: twitter.com/thehaysstanford

    Description: 
        - Contains common functions for user actions using
        Firebase Real-time Database.
        - Specifically designed for use with any project 
        utilizing Firebase & individual user accounts.
----------------------------------------------------------------
<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
*/

import firebase from 'firebase'

//Automatically set to 'production' when published through Expo
var env = process.env.NODE_ENV || 'development';
// var env = 'production'
var config = require('../config')[env];
 
export function storeNewUser(user) {
    ifUserNotFound(user.uid, () => storeUser(user))
}

export function storeUser(user) {
    const data = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        name: '',
    }

    firebase.database().ref().child('users').child(user.uid)
        .set({ data })

    console.log('stored user.')
}

export function ifUserNotFound(uid, cb) {
    getUser(uid, (user) => {
        if(!user) {
            cb()
        } else {
            console.log('user exist in database.')
        }
    })
}

export function getUser(uid, cb) { 
    console.log('getUser called')

    return firebase.database().ref().child('users').child(uid)
        .once('value')
        .then((snap) => {
            cb(snap.val())
        })
}

export function signOut(cb) {
	firebase.auth().signOut()
    cb()
}

export const signInWithPhoneAndCaptcha = async (phone, token, cb) => {
    //fake firebase.auth.ApplicationVerifier
    const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(token)
    }

    try {
        const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, captchaVerifier)
        
        cb(confirmationResult)
    } catch (e) {
        console.warn(e)
    }
}

export const getAuth = (cb) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        cb(user)
        unsubscribe()
    })
}

