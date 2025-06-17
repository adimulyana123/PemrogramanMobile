// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD1vnPuXX-y5MhIf6v64Q_X2NQ1cjd9W-E',
  authDomain: 'projectapp1.firebaseapp.com',
  projectId: 'projectapp1',
  storageBucket: 'projectapp1.appspot.com',
  messagingSenderId: '775473474232',
  appId: '1:775473474232:android:1de49025a9b646e24be24d',
};

// Hanya jika belum diinisialisasi
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {auth};
