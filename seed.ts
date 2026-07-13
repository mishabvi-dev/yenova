import { db } from './src/lib/firebase.js';
import { doc, setDoc } from 'firebase/firestore';

const events = [
  { id: 101, hash: "mili2026", title: "Mini Militia Esports Tournament", desc: "5 vs 5 Tournament. Prize Pool ₹1000.", date: "31st MARCH 2026", fee: 150, seatsTotal: 50, seatsTaken: 0 },
  { id: 102, hash: "job2026", title: "Job Essentials: How To Land Your 1st JOB", desc: "Speaker Ahsaaf S. Venue LH101.", date: "19 Feb 2026", fee: 0, seatsTotal: 100, seatsTaken: 0 },
  { id: 103, hash: "recon2026", title: "RECON Z - Digital Forensics", desc: "Cyber forensics and security workshop.", date: "4-5 Feb 2026", fee: 0, seatsTotal: 80, seatsTaken: 0 },
  { id: 104, hash: "git2026", title: "GIT & GITHUB WORKSHOP", desc: "Speakers Alan HM & Yasin.", date: "22 JAN 2026", fee: 0, seatsTotal: 60, seatsTaken: 0 }
];

async function seed() {
  for (const e of events) {
    await setDoc(doc(db, 'events', e.id.toString()), e);
    console.log("Added", e.title);
  }
  process.exit(0);
}
seed();
