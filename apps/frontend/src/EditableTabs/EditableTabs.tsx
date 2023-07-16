// this component allows user to create named tabs, and add content to each tab which
// is text in textarea

import { useEffect, useState } from "react";
import s from "./EditableTabs.module.scss";
import { TTab } from "../../pages/scenarios/[id]/testStore";

type TEditableTabsProps = {
  tabs: TTab[];
  setTabs: (tabs: TTab[]) => void;
  onSelect: (tab: TTab) => void;
};

export const EditableTabs = ({
  tabs = [],
  setTabs,
  onSelect,
}: TEditableTabsProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const currentTab = tabs[tabIndex];
  useEffect(() => {
    onSelect(currentTab);
  }, [onSelect, currentTab]);

  return (
    <div className={s.editableTabs}>
      <div className="flex flex-row gap-1">
        {tabs.map((tab, index) => (
          <button
            className={
              index === tabIndex ? "bg-emerald-500 px-1" : "bg-gray-500 px-1"
            }
            key={index}
            onClick={() => {
              setTabIndex(index);
            }}
          >
            {tab.name}
          </button>
        ))}
        {/* <button
          className="bg-emerald-500 px-1"
          onClick={() => {
            setTabs([...tabs, { name: "new tab", content: "" }]);
          }}
        >
          add tab
        </button> */}
      </div>
      <div className="flex flex-row">
        <textarea
          wrap="soft"
          rows={10}
          cols={40}
          value={currentTab.content}
          onChange={(e) => {
            const newTabs = [...tabs];
            newTabs[tabIndex].content = e.target.value;
            setTabs(newTabs);
          }}
        />
      </div>
    </div>
  );
};
