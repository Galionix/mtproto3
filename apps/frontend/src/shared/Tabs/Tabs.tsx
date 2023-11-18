import { useState, useEffect } from "react";
type TTab = {
  name: string;
  content: React.ReactNode;
};
type TTabsProps = {
  tabs: TTab[];
  // onSelect: (tab: string) => void;
};

export const Tabs = ({ tabs }: TTabsProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const currentTab = tabs[tabIndex];
  return (
    <div className="flex flex-col">
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
      </div>
      <div className="flex flex-row">
        <div className="p-1">{currentTab.content}</div>
      </div>
    </div>
  );
};
