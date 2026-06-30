import nodeSchedule from 'node-schedule';
// Importera hela paketet som ett unikt namespace för att undvika krockar
import * as firebaseAdmin from 'firebase-admin';

import serviceAccount from '../../../serviceAccountKey.json' assert { type: 'json' };

// Initiera appen med de importerade funktionerna
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.Credential.cert(serviceAccount)
});

// Hämta databasinstansen
const db = firebaseAdmin.firestore();
const testDate = new Date(2027, 5, 24);

console.log("Scheduler started with Admin SDK (Modular)");

nodeSchedule.scheduleJob('*/15 * * * * *', async () => {
  try {
    const snapshot = await db.collection('events').get();
    const promises: Promise<void>[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const eventDate = new Date(data.date);

      if (eventDate < testDate) {
        const deletePromise = doc.ref.delete()
          .then(() => console.log(`Event ${doc.id} successfully deleted!`))
          .catch(err => console.error(`Error deleting ${doc.id}:`, err));
        
        promises.push(deletePromise);
      } else {
        console.log(`Event ${doc.id} is in the future!`);
      }
    });

    await Promise.all(promises);

  } catch (error) {
    console.error("Kunde inte hämta dokument: ", error);
  }
});