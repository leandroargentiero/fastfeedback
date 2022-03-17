import admin from 'firebase-admin';

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      })
    });
  } catch (err) {
    console.log(err.message);
  }
}

const db = admin.firestore();

export { db };
export default admin.firestore();
