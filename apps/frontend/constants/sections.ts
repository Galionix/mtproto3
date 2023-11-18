import { BiUser } from "react-icons/bi";
import { PiFilmScriptFill } from "react-icons/pi";

export const sections = [
  {
    key: "scenarios",
    title: "Scenarios",
    url: "/scenarios",
    icon: PiFilmScriptFill,
    description: "Create and manage scenarios",
  },
  {
    key: "bots",
    title: "Bots",
    url: "/bots",
    icon: BiUser,
    description: "Create and manage bots",
  },
];

export type Section = (typeof sections)[number];
