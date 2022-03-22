import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  collection
} from 'firebase/firestore';
import { db } from './firebase';

export async function createUser(uid, data) {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { uid, ...data }); // set() for specified id
  } catch (error) {
    return { error };
  }
}

export async function createSite(data) {
  try {
    const newSite = await addDoc(collection(db, 'sites'), data); // add() for auto-generated id
    return { newSite };
  } catch (error) {
    return { error };
  }
}

export async function createFeedback(data) {
  try {
    const newFeedback = await addDoc(collection(db, 'feedback'), data);
    return { newFeedback };
  } catch (error) {
    return { error };
  }
}

export async function deleteFeedback(id) {
  try {
    await deleteDoc(doc(db, 'feedback', id));
  } catch (error) {
    return { error };
  }
}

export async function getSite(siteId) {
  try {
    const docRef = doc(db, 'sites', siteId);
    const docSnap = await getDoc(docRef);

    return { site: docSnap.data() };
  } catch (error) {
    return { error };
  }
}
