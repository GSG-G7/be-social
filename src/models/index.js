import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCCYOjQ0Sh5rvkCkFGnhqaj-u3HfpnHKxw',
  authDomain: 'besocial-c83b6.firebaseapp.com',
  databaseURL: 'https://besocial-c83b6.firebaseio.com',
  projectId: 'besocial-c83b6',
  storageBucket: 'besocial-c83b6.appspot.com',
  messagingSenderId: '470448605176',
  appId: '1:470448605176:web:77826d14862002a85af80d',
};

const firebase = app.initializeApp(firebaseConfig);

export default firebase;
