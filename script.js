import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, getDocs, addDoc, collection, orderBy, query } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCfvhRy9HTtWjqPSKY9ik6ctTxdh4N3ri8",
    authDomain: "simplechat-afc0f.firebaseapp.com",
    projectId: "simplechat-afc0f",
    storageBucket: "simplechat-afc0f.appspot.com",
    messagingSenderId: "1082367455809",
    appId: "1:1082367455809:web:cedb50dbb0403d65ba8cc0"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userID = document.getElementById('user').value;
const paragraph = document.getElementById("message");


document.getElementById("form").onsubmit = async function (e) {
    
    e.preventDefault();
    const msg = document.getElementById("msg").value;
    document.getElementById('msg').value = " ";
    var currentdate = new Date().toLocaleString();

    const docRef = await addDoc(collection(db, "chaty"), {
        user: document.getElementById('user').value,
        msg: msg,
        time: currentdate
    });
    // console.log("Document written with ID: ", docRef.id);
    loadmyself();
}
// .orderBy("time").get()
// const _ = require("lodash"); 
const loadmyself = async function () {
    const querySnapshot = await getDocs(collection(db, "chaty"));
    paragraph.innerHTML = " ";
    // querySnapshot.orderBy("time", "asc");
    // let gfg = _.orderBy(querySnapshot, ['time'], ['asc']);
    querySnapshot.forEach((doc) => {
        var data = doc.data().msg;
        if (doc.data().user == userID) {
            paragraph.innerHTML += "<hard>" + data + "</hard>";
        }
        else {
            paragraph.innerHTML += "<span>" + data + "</span>";
        }
    });
}
const intervals = setInterval(async function () {
   await loadmyself();
}, 5000);
window.onload = async function () {
    await loadmyself();
}



   // const starter = getDocs(collection(db,'chaty'));
    //  const  querySnapshot = await starter.orderBy('time', 'asc').get();
    // const querySnapshot = query(collection(db, "chaty"),orderBy('time', "asc"))
    // let querySnapshot = await getDocs(query("chaty", orderBy('timestamp')));
