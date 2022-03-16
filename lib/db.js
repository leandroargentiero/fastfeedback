import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

export async function createUser(uid, data) {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { uid, ...data }); // set() for specified id
  } catch (err) {
    console.log('Failed to create user:', err);
  }
}

export async function createSite(data) {
  try {
    await addDoc(collection(db, 'sites'), data); // add() for auto-generated id
  } catch (err) {
    console.log('Failed to create site:', err);
  }
}
