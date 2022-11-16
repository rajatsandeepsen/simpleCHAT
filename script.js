import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, getDocs, addDoc, collection, query, orderBy, limit} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

function getCurrentTimestamp () {
  return Date.now()
}

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
let arr = [];
let i=0;

document.getElementById("form").onsubmit = async function (e) {
    
    e.preventDefault();
    const msg = document.getElementById("msg").value;
    document.getElementById('msg').value = " ";
    //var currentdate = new Date().toLocaleString();
 var currentdate= getCurrentTimestamp();
    const docRef = await addDoc(collection(db, "chaty"), {
        user: document.getElementById('user').value,
        msg: msg,
        time: currentdate
    });
    console.log("Document written with ID: ", docRef.id);
    loadmyself();
}
const loadmyself = async function () {
    const querySnapshot = await getDocs(collection(db, "chaty"));
    arr = [];
    i = 0;
    querySnapshot.forEach((doc) => {
        // console.table(doc.data());
        arr[i++] = doc.data();
    });
    displayArr();
    paragraph.scrollTop = paragraph.scrollHeight;
}

// document.getElementById("deleteAll").onclick = async function (e) {
//     const querySnapshot = await getDocs(collection(db, "chaty"));
//     const batch = db.batch();
//     querySnapshot.docs.forEach((doc) => {
//         batch.delete(doc.ref);
//     });
//   await batch.commit();
// }

function displayArr (){
    var sortedDesc = arr.sort(
      (objA, objB) => Number(objA.time) - Number(objB.time),);
     //sortedDesc.reverse();
    //arr.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
    paragraph.innerHTML = " ";
    sortedDesc.forEach(value=>{
        var data = value.msg;
        if (value.user === userID) {
            paragraph.innerHTML += "<hard>" + data + "</hard>";
        }
        else {
            paragraph.innerHTML += "<span>" + data + "</span>";
        }
    })
}
const intervals = setInterval(async function () {
   await loadmyself();
}, 5000);
window.onload = async function () {
    await loadmyself();
}
