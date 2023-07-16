import { useState } from "react";
import { PiFilmScriptFill } from "react-icons/pi";
import { SiPhpmyadmin } from "react-icons/si";
import { Clickable } from "./shared/Clickable/Clickable";

export const Header = () => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const navClassNames = isOpen
  //     ? "block w-full flex-grow lg:flex lg:items-center lg:w-auto"
  //     : "hidden w-full flex-grow lg:flex lg:items-center lg:w-auto";

  return (
    <header
      className="
          flex
            justify-between
            items-center
            px-4
            py-3
            shadow-md
          "
      //   style={{
      //     height: isOpen ? "100vh" : "auto",
      //   }}
    >
      {/* <nav
        //   className="flex items-center justify-between flex-wrap bg-teal-500 p-6"
        className={navClassNames}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Botfather Admin
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav> */}

      {/* <h1>Botfather Admin</h1> */}
      <Clickable
        comp="link"
        href="/"
        text="Botfather Admin"
        icon={SiPhpmyadmin}
      />

      <div>
        <Clickable
          comp="link"
          href="/scenarios"
          text="Scenarios"
          icon={PiFilmScriptFill}
        />
      </div>
    </header>
  );
};
