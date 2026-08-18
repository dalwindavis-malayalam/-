// ---- Shared Firebase setup for അക്ഷരം ----
var firebaseConfig = {
  apiKey: "AIzaSyBWkkQzv_lXXQMFKebbmT_mhAFkfgdJaoc",
  authDomain: "aksharam-8644a.firebaseapp.com",
  projectId: "aksharam-8644a",
  storageBucket: "aksharam-8644a.firebasestorage.app",
  messagingSenderId: "642544638562",
  appId: "1:642544638562:web:6c7cab465e1a461cfb0f3b"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var ADMIN_EMAIL = 'dalwindavis99@gmail.com';

// Logs a student action (opening a note or game) to Firestore.
// type: 'note' | 'game'   label: filename/title of what was opened
function logActivity(type, label){
  var user = firebase.auth().currentUser;
  if (!user || typeof firebase.firestore !== 'function') return;
  firebase.firestore().collection('activity').add({
    uid: user.uid,
    email: user.email,
    type: type,
    label: label,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(function(err){ console.warn('log failed', err); });
}

// Call this on any page that must be locked behind login.
// Shows the page only after confirming the user is signed in;
// otherwise redirects to the login page.
function requireAuth(loginPage){
  loginPage = loginPage || 'index.html';
  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      document.documentElement.style.visibility = 'visible';
    } else {
      window.location.href = loginPage;
    }
  });
}

// Call this from a logout button/link.
function doLogout(loginPage){
  loginPage = loginPage || 'index.html';
  firebase.auth().signOut().then(function(){
    window.location.href = loginPage;
  });
}
