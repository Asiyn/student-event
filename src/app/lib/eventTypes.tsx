import type { StaticImageData } from "next/image";
import vkImg from "../../images/02_VK.png";
import fullMoonSSkadat from "../../images/fullMoonSSkadat.jpg";
import halloweenImg from "../../images/halloween.jpg";
import MidnightImg from "../../images/midnight_tease_skumpa.jpg";

export const STORAGE_KEY = "user_events";

export type EventFormData = {
  //"undefined" för events som inte är sparade i firestore tror jag, som default events
  id: number | undefined;
  event: string;
  arrangor: string;
  date: string;
  place: string;
  startTime: string;
  endTime: string;
  fakultet: string;
  beskrivning: string;
  organizerURL: string;
  color?: string | null;

  //för default bilder
  imageData?: string | StaticImageData | null;

  //för firestore
  imageUrl?: string | null; // ladda ner url till bilden
  imagePath?: string | null; //pathen i eventstore
};
export const DEFAULT_EVENTS: EventFormData[] = [
  {
    id: 1,
    event: "VinterKravallen",
    arrangor: "Fest-n",
    date: "2026-01-31",
    place: "Kårhuset Kollektivet",
    startTime: "18:00",
    endTime: "23:00",
    fakultet: "LinTek",
    beskrivning: "VinterKravall hela veckan!",
    organizerURL: "https://lintek.liu.se",
    imageData: vkImg,
    color: "#FF9800",
  },
  {
    id: 2,
    event: "FullMoon",
    arrangor: "SSKADAT",
    date: "2025-12-19",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "Consensus",
    beskrivning: "Temasittning med tacos, underhållning och efterfest.",
    organizerURL: "https://stuff.liu.se",
    imageData: fullMoonSSkadat,
    color: "#5a2d5fff",
  },
  {
    id: 3,
    event: "Halloween",
    arrangor: "3CANT",
    date: "2025-12-24",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "LinTek",
    beskrivning: "Temasittning med tacos, underhållning och efterfest.",
    organizerURL: "https://lintek.liu.se",
    imageData: halloweenImg,
    color: "#af4c9eff",
  },
  {
    id: 4,
    event: "Midnight Tease",
    arrangor: "Skumpa",
    date: "2025-12-19",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "Stuff",
    beskrivning: "Temasittning med tacos, underhållning och efterfest.",
    organizerURL: "https://stuff.liu.se",
    imageData: MidnightImg,
    color: "#af4c4cff",
  },
];
