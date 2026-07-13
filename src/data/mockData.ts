export interface ClubEvent {
  id: number;
  hash: string;
  title: string;
  desc: string;
  date: string;
  fee: number;
  seatsTotal: number;
  seatsTaken: number;
  posterUrl?: string;
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  event: string;
  amount: number;
  method: string;
  time: string;
}

export const initialEvents: ClubEvent[] = [
  { id: 1, hash: "a3f9c2e", title: "HackNova 2026", desc: "24-hour team hackathon — build, ship, pitch. Mentors on-site.", date: "Aug 15–16, 2026", fee: 499, seatsTotal: 150, seatsTaken: 97, posterUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 2, hash: "7b1d4aa", title: "Intro to Cloud & DevOps", desc: "Hands-on workshop: containers, CI/CD, and your first deploy.", date: "Aug 2, 2026", fee: 0, seatsTotal: 60, seatsTaken: 34 },
  { id: 3, hash: "e88c110", title: "CTF Night: Capture the Byte", desc: "Beginner-friendly capture-the-flag with prizes for top 3 teams.", date: "Aug 22, 2026", fee: 199, seatsTotal: 80, seatsTaken: 41 },
  { id: 4, hash: "4f02ab9", title: "Web3 & Blockchain Bootcamp", desc: "Two-day bootcamp covering smart contracts and dApp basics.", date: "Sep 5–6, 2026", fee: 699, seatsTotal: 100, seatsTaken: 18 },
];

export const teamMembers = [
  { name: "Aditi Rao", role: "President" },
  { name: "Rohan Nair", role: "Vice President" },
  { name: "Sneha Kamath", role: "Tech Lead" },
  { name: "Farhan Sheikh", role: "Events Lead" },
];

export const teamColors = ["#5EEAD4", "#F5A524", "#7FB8F0", "#F0685E"];
