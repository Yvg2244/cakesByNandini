import {getApp,getApps,initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCSVGKIE_zMdykShA9E9L83mVrZ5tYVcno",
    authDomain: "cbn24-96e54.firebaseapp.com",
    databaseURL: "https://cbn24-96e54-default-rtdb.firebaseio.com",
    projectId: "cbn24-96e54",
    storageBucket: "cbn24-96e54.appspot.com",
    messagingSenderId: "580655712169",
    appId: "1:580655712169:web:922f2a28b8a6b704dc66b8",
    measurementId: "G-YQB5VZ82M0"
  };

  const app=getApps.length>0?getApp():initializeApp(firebaseConfig)
  const firestore=getFirestore(app)
  const storage=getStorage(app)

  export{app,firestore,storage}