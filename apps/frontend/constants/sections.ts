import { BiUser } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";
import { PiFilmScriptFill } from "react-icons/pi";
import { FcBiohazard } from "react-icons/fc";
import { IoInformationCircleOutline } from "react-icons/io5";

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
  // spam
  {
    key: "spam",
    title: "Spam",
    url: "/spam",
    icon: FcBiohazard,
    description: "Create and manage spam",
  },
  // docs
  {
    key: "docs",
    title: "Docs",
    url: "/docs",
    icon: IoInformationCircleOutline,
    description: "Read the documentation",
  },
];

export type Section = (typeof sections)[number];
