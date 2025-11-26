/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, useState } from 'react';

import { cn } from '@app/utils/cn';

type TabsProps = {
  tabs: {
    id: string;
    name: string;
    icon?: ReactNode;
    content: ReactNode;
  }[];
  defaultTab?: number;
};

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [currentTab, setCurrentTab] = useState<number>(defaultTab ?? 0);

  function handleChangeTab(index: number) {
    setCurrentTab(index);
  }

  return (
    <div className="flex flex-1 flex-col p-2 space-y-10">
      <div className="flex flex-row items-center  gap-2 ">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={cn(
              'flex items-center  gap-2  p-2 rounded-lg  cursor-pointer relative opacity-70',
              currentTab === index &&
                'after:content-[""] after:absolute after:left-0 after:bottom-[-9.5px] after:w-full after:border-b-2 after:border-foreground opacity-100 after:transition-all after:ease-in after:duration-200 ',
            )}
            onClick={() => handleChangeTab(index)}
          >
            <small>{tab.name}</small>
            {tab.icon && tab.icon}
          </div>
        ))}
      </div>
      <div className="">{tabs[currentTab].content}</div>
    </div>
  );
}
