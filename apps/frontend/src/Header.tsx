import { SiPhpmyadmin } from "react-icons/si";
import { Clickable } from "./shared/Clickable/Clickable";
import { sections } from "../constants/sections";
import { useMainPageStore } from "../pages/scenarios/mainPageStore";
import { useClient } from "./utils/hooks/useClient";
import { useState } from "react";

export const Header = () => {
  const { sectionsInHeader } = useMainPageStore();
  const [renderSections, setRenderSections] = useState(false);

  useClient(() => {
    setRenderSections(true);
  });

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
    >
      <Clickable
        comp="link"
        href="/"
        text="Botfather Admin"
        icon={SiPhpmyadmin}
      />

      <div
        suppressHydrationWarning={true}
        className="flex flex-row items-center justify-center space-x-4"
      >
        {renderSections &&
          sections.map((section) => {
            if (!sectionsInHeader.includes(section.key)) return null;
            return (
              <Clickable
                comp="link"
                key={section.key}
                href={section.url}
                text={section.title}
                title={section.description}
                icon={section.icon}
              />
            );
          })}
      </div>
    </header>
  );
};
