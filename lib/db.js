import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function createUser(uid, data) {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { uid, ...data }, { merge: true });
  } catch (e) {
    console.log(e);
  }
}
