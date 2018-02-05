import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyDvLXUj-TAY1vWKmzcqIhpQ5a48qnWXnNw",
    authDomain: "fir-vue-elwin.firebaseapp.com",
    databaseURL: "https://fir-vue-elwin.firebaseio.com",
    projectId: "fir-vue-elwin",
    storageBucket: "",
    messagingSenderId: "785798611557"
  });

  export const db = app.database();
  export const borrowsRef = db.ref('borrows');
  export const namesRef = db.ref('names');