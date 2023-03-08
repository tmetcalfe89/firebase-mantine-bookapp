import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import firebaseConfig from "./firebase.config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

async function authenticate() {
  await signInWithPopup(auth, googleProvider);
}

async function logout() {
  await signOut(auth);
}

async function addEntry(
  collectionName,
  newEntry,
  { stampOwnerId = true } = {}
) {
  const addRes = await addDoc(collection(db, collectionName), {
    ...newEntry,
    owner: stampOwnerId ? auth.currentUser.uid : undefined,
  });
  const getRes = await getDoc(doc(db, collectionName, addRes.id));
  return { id: addRes.id, ...getRes.data() };
}

async function getEntries(
  collectionName,
  rules = [],
  { checkOwnerId = true } = {}
) {
  const queryRules = [
    checkOwnerId ? where("owner", "==", auth.currentUser.uid) : undefined,
    ...rules.map(([propName, evaluator, propValue]) =>
      where(propName, evaluator, propValue)
    ),
  ].filter((e) => e);

  const res = await getDocs(
    query(collection(db, collectionName), ...queryRules)
  );
  return res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function removeEntryById(collectionName, id) {
  await deleteDoc(doc(db, collectionName, id));
}

async function updateEntry(collectionName, entryId, { id, ...newEntryData }) {
  await setDoc(doc(db, collectionName, entryId), newEntryData);
  const getRes = await getDoc(doc(db, collectionName, entryId));
  return { id: entryId, ...getRes.data() };
}

export {
  authenticate,
  logout,
  auth,
  getEntries,
  addEntry,
  removeEntryById,
  updateEntry,
};
