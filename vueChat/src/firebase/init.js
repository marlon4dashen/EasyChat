  import firebase from 'firebase'
  import firestore from 'firebase/firestore'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC_Q6Hcdk_2bXsdRIQHGzDhQA6A_wvjw2Y",
    authDomain: "vuechat-c6177.firebaseapp.com",
    databaseURL: "https://vuechat-c6177.firebaseio.com",
    projectId: "vuechat-c6177",
    storageBucket: "vuechat-c6177.appspot.com",
    messagingSenderId: "769482577927",
    appId: "1:769482577927:web:b33666453fb4c31df132a2",
    measurementId: "G-B76X6XZWDN"
  };
  

  const firebaseApp = firebase.initializeApp(firebaseConfig);



  export default firebaseApp