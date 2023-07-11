import { initializeApp } from "firebase/app";
import {getFirestore} from"firebase/firestore";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
    apiKey: "AIzaSyAFk6ft7X8fAjrNj6qsNoMc29vcAyw0rLU",
    authDomain: "data-storage-js.firebaseapp.com",
    projectId: "data-storage-js",
    storageBucket: "data-storage-js.appspot.com",
    messagingSenderId: "461660636295",
    appId: "1:461660636295:web:8936dfe8e83a6da20ca422",
    measurementId: "G-68QFJSTPS6"
  };
  
  initializeApp(firebaseConfig);
  const db=getFirestore();

 const storage = getStorage();


  export {db};

  export {storage};

// 
  // const auth=getAuth()