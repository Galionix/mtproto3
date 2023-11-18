import { useQuery } from "@apollo/client";
import styles from "./index.module.scss";
import { Layout } from "../src/shared/Layout/Layout";
import { Section, sections } from "../constants/sections";
import { Clickable } from "../src/shared/Clickable/Clickable";
import { useMainPageStore } from "./scenarios/mainPageStore";

export function Index() {
  const { sectionsInHeader, toggleSectionInHeader } = useMainPageStore();

  return (
    <Layout>
      <div className={styles.page}>
        <div>
          <h1>Sections:</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {sections.map((section) => {
              return (
                <SectionRenderer
                  inHeader={sectionsInHeader.includes(section.key)}
                  toggleSectionInHeader={toggleSectionInHeader}
                  section={section}
                  key={section.key}
                />
              );
            })}
          </div>
        </div>
        {/* <div className="flex">test nextjs</div> */}
      </div>
    </Layout>
  );
}

export default Index;

const SectionRenderer = ({
  section,
  toggleSectionInHeader,
  inHeader,
}: {
  inHeader: boolean;
  section: Section;
  toggleSectionInHeader: (section: string) => void;
}) => {
  const Icon = section.icon;
  return (
    <article className="grid grid-cols-3 auto-rows-min p-4 border-2 border-gray-200 rounded-md shadow-md hover:border-indigo-200">
      <Clickable
        className="col-span-3 !w-full flex flex-col items-center justify-center"
        comp="link"
        href={section.url}
        text={section.title}
      >
        <Icon className="text-6xl text-gray-300" />
        {/* <h1>{section.title}</h1> */}
      </Clickable>
      <p className="col-span-3">{section.description}</p>
      {/* <Clickable
        comp="link"
        href={section.url}
        text={"Go to " + section.title}
      /> */}
      <div
        onClick={() => toggleSectionInHeader(section.key)}
        className="col-start-2 col-span-2 gap-1 ml-auto flex items-center justify-end  cursor-pointer select-none"
      >
        <label className="cursor-pointer text-xs" htmlFor="">
          In header
        </label>
        <input type="checkbox" defaultChecked={inHeader} />
      </div>
    </article>
  );
};