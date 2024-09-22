// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnMemoUBDgjXqQe--Tqrvb22trbsrA5aw",
  authDomain: "grade-calculator-d4762.firebaseapp.com",
  projectId: "grade-calculator-d4762",
  storageBucket: "grade-calculator-d4762.appspot.com",
  messagingSenderId: "600789154014",
  appId: "1:600789154014:web:d1e4d4165f763ef4846a4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
module.exports = storage;
