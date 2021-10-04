const admin = require('firebase-admin');
const { googleKey } = require('../config/config')

const initializeApp = () => {
    const credentials = {
        credential: admin.credential.cert(googleKey),
        databaseUrl: "https://parkshare-51e24.firebaseio.com",
    }
    admin.initializeApp(credentials)
}

const initializeDB = () => {
    return admin.firestore()
}

module.exports = { initializeApp, initializeDB }