import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCMTOXvGdi7r9r2Z2d_X9OygBZn1IpjncI",
  authDomain: "rockship-test.firebaseapp.com",
  databaseURL: "https://rockship-test.firebaseio.com",
  projectId: "rockship-test",
  storageBucket: "rockship-test.appspot.com",
  messagingSenderId: "1011386995879"
});

export default firebaseApp;
