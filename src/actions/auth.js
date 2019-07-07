import {firebase, googleProvider} from '../firebase/firebase'


const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleProvider)
  }
}

const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
  }
}

export {startLogin, startLogout}