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


  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      showSetGoalsScreen()
      // User successfully signed in.
      console.log(authResult, authResult.user.displayName, authResult.user.email, authResult.user.photoURL)
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      user_auth_data.user_is_logged_in=true
      user_auth_data.user_name=authResult.user.displayName
      user_auth_data.user_email=authResult.user.email
      user_auth_data.user_pp =  authResult.user.photoURL
      localStorage.setItem("auth",JSON.stringify(user_auth_data))
      
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },

});