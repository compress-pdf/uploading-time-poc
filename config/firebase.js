// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgx-Z_OeU8g8-PYEL28wksTzxKYE_L0OI",
  authDomain: "express-file-upload.firebaseapp.com",
  projectId: "express-file-upload",
  storageBucket: "express-file-upload.appspot.com",
  messagingSenderId: "397585462001",
  appId: "1:397585462001:web:ea402578e5182b07dd6f50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
module.exports = storage;
