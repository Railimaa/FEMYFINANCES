/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from 'framer-motion';
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
      <div className="flex flex-row items-center  gap-2">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={cn(
              'flex items-center  gap-2  p-2 rounded-lg  cursor-pointer relative',
              currentTab !== index &&
                'opacity-70 hover:bg-foreground/10 transition-all ease-in duration-300',
            )}
            onClick={() => handleChangeTab(index)}
          >
            <small>{tab.name}</small>
            {tab.icon && tab.icon}

            {currentTab === index && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 -bottom-2 h-[2px] w-full bg-foreground"
                transition={{ type: 'spring', stiffness: 500, damping: 50 }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="">{tabs[currentTab].content}</div>
    </div>
  );
}
