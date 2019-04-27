  import firebase from 'firebase';
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAODNiRR-63sd8-V8GL-k57SRvx9CGWGPk",
    authDomain: "foxy-b9f5d.firebaseapp.com",
    databaseURL: "https://foxy-b9f5d.firebaseio.com",
    projectId: "foxy-b9f5d",
    storageBucket: "foxy-b9f5d.appspot.com",
    messagingSenderId: "222736271309"
  };
  
  export default firebase.initializeApp(config);