var firebaseConfig = {
    apiKey: "AIzaSyC_tNlcw2gKLuz7pjWnoRktKSZ9sDNifeU",
    authDomain: "goals-app-new.firebaseapp.com",
    projectId: "goals-app-new",
    storageBucket: "goals-app-new.appspot.com",
    messagingSenderId: "667648358864",
    appId: "1:667648358864:web:66aa59e10ee3ec39d1e1d5"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);



// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
   
],

});