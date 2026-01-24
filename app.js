import { auth, db, storage } from "./firebase.js";
import {
  collection, doc, addDoc, setDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("room");

const pdfCanvas = document.getElementById("pdfCanvas");
const drawCanvas = document.getElementById("drawCanvas");
const ctx = drawCanvas?.getContext("2d");

let drawing = false;
let lastX, lastY;

// CREATE ROOM
document.getElementById("createRoom")?.addEventListener("click", async () => {
  const file = document.getElementById("pdfFile").files[0];
  const roomRef = doc(collection(db, "rooms"));

  const storageRef = ref(storage, `pdfs/${roomRef.id}.pdf`);
  await uploadBytes(storageRef, file);
  const pdfUrl = await getDownloadURL(storageRef);

  await setDoc(roomRef, {
    pdfUrl,
    ownerId: auth.currentUser.uid
  });

  window.location.href = `room.html?room=${roomRef.id}`;
});

// JOIN ROOM
if (roomId) {
  const roomRef = doc(db, "rooms", roomId);

  onSnapshot(collection(roomRef, "strokes"), snap => {
    snap.docChanges().forEach(change => {
      const s = change.doc.data();
      ctx.beginPath();
      ctx.moveTo(s.x0, s.y0);
      ctx.lineTo(s.x1, s.y1);
      ctx.stroke();
    });
  });

  drawCanvas.addEventListener("mousedown", e => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  drawCanvas.addEventListener("mousemove", async e => {
    if (!drawing) return;
    const stroke = {
      x0: lastX,
      y0: lastY,
      x1: e.offsetX,
      y1: e.offsetY
    };
    await addDoc(collection(roomRef, "strokes"), stroke);
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  drawCanvas.addEventListener("mouseup", () => drawing = false);
}
