import { BiUser } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";
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
  {
    key: "resources",
    title: "Resources",
    url: "/resources/view",
    icon: FaFileAlt,
    description: "Create and manage resources",
  },
];

export type Section = (typeof sections)[number];
