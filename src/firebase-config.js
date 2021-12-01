import * as firebase from "firebase";
import "firebase/firestore";

let config = {
    apiKey: "AIzaSyDDoJB6z9azarX3wtfTNRMztg9ASNJPDp4",
    authDomain: "admin-demo-d1f30.firebaseapp.com",
    projectId: "admin-demo-d1f30",
    storageBucket: "admin-demo-d1f30.appspot.com",
    messagingSenderId: "746104958205",
    appId: "1:746104958205:web:ecee34ea74e85987932294"
}

firebase.initializeApp(config);

export default firebase.firestore();