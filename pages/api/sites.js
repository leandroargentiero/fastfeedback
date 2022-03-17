import { db } from '@/lib/firebase-admin';

export default async function handler(_, res) {
  try {
    const sitesRef = db.collection('sites');
    const snapshot = await sitesRef.get();
    const sites = [];

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ sites });
  } catch (err) {
    console.log(err);
  }
}
