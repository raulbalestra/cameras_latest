import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo.png';
import DarkModeSwitcher from './DarkModeSwitcher';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center bg-white dark:bg-gray-800 shadow-lg rounded-b-2xl transition-all duration-300">
      <div className="flex w-full items-center justify-between px-6 py-4 md:px-8 2xl:px-12">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="rounded-md border border-gray-300 p-2 shadow-sm hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 000-2H3a1 1 0 000 2zm14 4H3a1 1 0 100 2h14a1 1 0 000-2zm0 6H3a1 1 0 100 2h14a1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <Link to="/" className="lg:hidden">
            <img
              src={LogoIcon}
              alt="Logo"
              className="h-8 w-auto transform hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Search Bar (only visible on larger screens) */}
        <div className="hidden sm:flex flex-grow max-w-md mx-auto">
          <form>
            <div className="relative">
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 18l6 6m0 0l6-6m-6 6V2a2 2 0 10-4 0v16"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search here..."
                className="w-full rounded-lg bg-gray-100 pl-10 pr-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 transition-shadow duration-200 focus:shadow-lg"
              />
            </div>
          </form>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          {/* Dark Mode Toggler */}
          <DarkModeSwitcher />

          {/* User Dropdown */}
          <DropdownUser onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
