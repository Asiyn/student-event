import nodeSchedule from 'node-schedule';
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase/firebase";


const today = new Date();

const testDate = new Date(2027,5,24);


console.log("Scheduler started");
console.log(today);

nodeSchedule.scheduleJob('*/15 * * * * *', async() => { // every day at 23:00; https://www.npmjs.com/package/node-schedule
 const querySnapshot = await getDocs(collection(db, 'events'));
 querySnapshot.forEach(async (doc) => {
   const data = doc.data();

   const eventDate = new Date(data.date);

   console.log(data.date);
   if(eventDate < testDate){
    try{
      await deleteDoc(doc.ref);
      console.log("Document successfully deleted!");
    } 
    catch (error) {
      console.error("Error removing document: ", error);
    }
   }else{
    console.log("This event is in the future!");
   }
 });
});
