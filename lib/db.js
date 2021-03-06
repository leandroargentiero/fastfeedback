import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch
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
    return { id: newSite.id };
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

export async function deleteSite(siteId) {
  // delete site
  await deleteDoc(doc(db, 'sites', siteId));
  // delete all related feedback
  const q = query(collection(db, 'feedback'), where('siteId', '==', siteId));
  const querySnapshot = await getDocs(q);

  const batch = writeBatch(db);
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return await batch.commit();
}

export async function updateSite(id, newValues) {
  return await updateDoc(doc(db, 'sites', id), newValues);
}

export async function createFeedback(data) {
  return await addDoc(collection(db, 'feedback'), data);
}

export async function updateFeedback(id, newValues) {
  try {
    const updatedFeedback = await updateDoc(doc(db, 'feedback', id), newValues);
    return { updatedFeedback };
  } catch (error) {
    return { error };
  }
}

export async function deleteFeedback(id) {
  return await updateDoc(doc(db, 'feedback', id), { status: 'removed' });
}
