import { motion } from 'framer-motion';
import { ChartColumn, House, User, X } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';

import { routes } from '@app/router/routes';
import { cn } from '@app/utils/cn';
import { Logo } from '@ui/assets/icons/Logo';

import { Button } from './Button';
import { Header } from './Header';

function SideBarPortal({ children }: { children: ReactNode }) {
  return createPortal(children, document.getElementById('sidebar-root')!);
}

export function SideBar({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const elementRef = useRef<null | HTMLDivElement>(null);

  const handleToggleOpen = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  useEffect(() => {
    function handleClose(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleClose);

    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }

    return () => {
      document.body.style.overflowY = '';
    };
  }, [open]);

  const links = [
    {
      id: 1,
      to: routes.home,
      icon: <House size={20} />,
      description: 'Inicio',
    },
    {
      id: 2,
      to: routes.dashboard,
      icon: <ChartColumn size={20} />,
      description: 'Dashboards',
    },
    {
      id: 3,
      to: routes.myProfile,
      icon: <User size={20} />,
      description: 'Meu Perfil',
    },
  ];

  return (
    <SideBarPortal>
      <div ref={elementRef}>
        <Header handleToggleSideBar={handleToggleOpen} />
        {open && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className="top-0 bottom-0 left-0 right-0 fixed z-[2000] bg-foreground/50"
            onClick={handleToggleOpen}
            slot="button"
          >
            <motion.div
              className="w-full max-w-[260px] h-full z-[2001] bg-background rounded-sm fixed flex flex-col space-y-10 "
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-2">
                <Logo isNavigate={false} />
                <Button variant="ghost" size="icon" onClick={handleToggleOpen}>
                  <X />
                </Button>
              </div>

              <div className="flex flex-col items-center gap-3">
                {links.map(({ id, to, description, icon }, index) => (
                  <motion.div
                    key={id}
                    initial={{ x: -260, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 25,
                      delay: index * 0.3,
                    }}
                    className="w-full"
                  >
                    <NavLink
                      to={to}
                      onClick={handleToggleOpen}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 w-full p-3 transition-all ease-in-out duration-500  border-l-[4px] border-l-transparent text-sm',
                          !isActive && 'hover:bg-foreground/5',
                          isActive && 'bg-foreground/10 border-l-foreground',
                        )
                      }
                    >
                      {icon}
                      <span>{description}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {children}
      </div>
    </SideBarPortal>
  );
}
