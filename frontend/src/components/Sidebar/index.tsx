import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/logo.png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-800 duration-300 ease-linear shadow-lg rounded-r-2xl border-r border-gray-700 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-10">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="w-90 h-auto" />
        </NavLink>
      </div>
      {/* Sidebar Header End */}

      {/* Sidebar Menu */}
      <div className="no-scrollbar flex flex-col overflow-y-auto px-4 py-6">
        <nav>
          <ul className="space-y-4">
            {/* Menu Group: Monitoramento e Acesso */}
            <SidebarLinkGroup activeCondition={pathname.includes('cameras')}>
              {(handleClick, open) => (
                <>
                  <NavLink
                    to="#"
                    className={`flex items-center gap-3 py-2 px-4 rounded-md font-medium text-gray-300 transition-colors duration-150 hover:bg-gray-700 ${
                      pathname.includes('cameras') ? 'bg-gray-700' : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                    }}
                  >
                    {/* Ícone de câmera para Monitoramento e Acesso */}
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-3-9h6l-2.5 3.5L9 11zM15 8h-6v1h6V8z" />
                    </svg>
                    Monitoramento e Acesso
                    <svg
                      className={`ml-auto transform transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 7l4.5 4.5L14.5 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </NavLink>
                  {/* Dropdown Menu */}
                  <div className={`pl-6 mt-2 ${open ? 'block' : 'hidden'}`}>
                    <ul className="space-y-2">
                      <li>
                        <NavLink
                          to="cameras/cascavel"
                          className="flex items-center gap-2 py-2 px-4 rounded-md text-gray-400 hover:bg-gray-700"
                        >
                          {/* Ícone de câmera para Cascavel */}
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Cascavel
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="cameras/guarapuava"
                          className="flex items-center gap-2 py-2 px-4 rounded-md text-gray-400 hover:bg-gray-700"
                        >
                          {/* Ícone de câmera para Guarapuava */}
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Guarapuava
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="cameras/londrina"
                          className="flex items-center gap-2 py-2 px-4 rounded-md text-gray-400 hover:bg-gray-700"
                        >
                          {/* Ícone de câmera para Londrina */}
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Londrina
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </SidebarLinkGroup>

            {/* Menu Item: Chart */}
            <li>
              <NavLink
                to="chart"
                className={`flex items-center gap-3 py-2 px-4 rounded-md font-medium text-gray-300 transition-colors duration-150 hover:bg-gray-700 ${
                  pathname.includes('chart') ? 'bg-gray-700' : ''
                }`}
              >
                {/* Ícone de gráfico para Chart */}
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 12h4v8H4zm6-8h4v16h-4zm6 4h4v12h-4z" />
                </svg>
                Chart
              </NavLink>
            </li>

            {/* Menu Item: Configurações */}
            <li>
              <NavLink
                to="settings"
                className={`flex items-center gap-3 py-2 px-4 rounded-md font-medium text-gray-300 transition-colors duration-150 hover:bg-gray-700 ${
                  pathname.includes('settings') ? 'bg-gray-700' : ''
                }`}
              >
                {/* Ícone de engrenagem para Configurações */}
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 4a8 8 0 100 16 8 8 0 000-16zm1 14h-2v-2h2v2zm1.293-4.707l-1.414 1.414-1.293-1.293-1.414 1.414L8.879 13.5l1.293-1.293 1.414-1.414 1.293 1.293 1.414-1.414L15.12 10.5l-1.293 1.293-1.414 1.414z" />
                </svg>
                Configurações
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
