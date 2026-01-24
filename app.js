import { authReady, auth, db, storage } from "./firebase.js";

import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* ---------- CREATE / JOIN ---------- */

const createBtn = document.getElementById("createRoom");
const joinBtn = document.getElementById("joinRoom");

if (createBtn) {
  createBtn.onclick = async () => {
    const file = document.getElementById("pdfFile").files[0];
    if (!file) return alert("Pick a PDF");

    await authReady;
    console.log("AUTH:", auth.currentUser.uid);

    const roomRef = doc(collection(db, "rooms"));
    const storageRef = ref(storage, `pdfs/${roomRef.id}.pdf`);

    await uploadBytes(storageRef, file);
    const pdfUrl = await getDownloadURL(storageRef);

    await setDoc(roomRef, {
      pdfUrl,
      ownerId: auth.currentUser.uid
    });

    window.location.href = `room.html?room=${roomRef.id}`;
  };
}

if (joinBtn) {
  joinBtn.onclick = () => {
    const id = document.getElementById("roomIdInput").value;
    if (id) window.location.href = `room.html?room=${id}`;
  };
}

/* ---------- ROOM ---------- */

const params = new URLSearchParams(window.location.search);
const roomId = params.get("room");

if (roomId) {
  const canvas = document.getElementById("drawCanvas");
  const ctx = canvas.getContext("2d");

  let drawing = false;
  let lastX, lastY;

  const strokesRef = collection(db, "rooms", roomId, "strokes");

  onSnapshot(strokesRef, snap => {
    snap.docChanges().forEach(change => {
      const s = change.doc.data();
      ctx.beginPath();
      ctx.moveTo(s.x0, s.y0);
      ctx.lineTo(s.x1, s.y1);
      ctx.stroke();
    });
  });

  canvas.onmousedown = e => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  };

  canvas.onmouseup = () => drawing = false;

  canvas.onmousemove = async e => {
    if (!drawing) return;

    await addDoc(strokesRef, {
      x0: lastX,
      y0: lastY,
      x1: e.offsetX,
      y1: e.offsetY
    });

    lastX = e.offsetX;
    lastY = e.offsetY;
  };
}
