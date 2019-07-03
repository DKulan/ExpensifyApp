import * as firebase from 'firebase'


const config = {
  apiKey: "AIzaSyDmk82sLlDADw2nFiqoskxB_49BBai3q-U",
  authDomain: "expensify-5da4e.firebaseapp.com",
  databaseURL: "https://expensify-5da4e.firebaseio.com",
  projectId: "expensify-5da4e",
  storageBucket: "expensify-5da4e.appspot.com",
  messagingSenderId: "483927480762",
  appId: "1:483927480762:web:636ea33ec91761c3"
}

firebase.initializeApp(config)

const database = firebase.database()

export {firebase, database}