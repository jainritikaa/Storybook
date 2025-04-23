import React, { useState, useEffect } from 'react';
import {
  AiOutlineHome,
  AiOutlinePicture,
  AiOutlineFile,
  AiOutlineCamera,
  AiOutlineBook,
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineUser
} from 'react-icons/ai';
import { FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type Theme = 'light' | 'dark';

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGElement> & { className?: string }>;
  notification?: number;
}

const sidebarItems: SidebarItem[] = [
  { href: '#', label: 'Dashboard', icon: AiOutlineHome },
  { href: '#', label: 'Gallery', icon: AiOutlinePicture, notification: 3 },
  { href: '#', label: 'Documents', icon: AiOutlineFile },
  { href: '#', label: 'Camera', icon: AiOutlineCamera },
  { href: '#', label: 'Library', icon: AiOutlineBook },
  { href: '#', label: 'Alerts', icon: AiOutlineBell, notification: 5 },
  { href: '#', label: 'Settings', icon: AiOutlineSetting },
  { href: '#', label: 'Profile', icon: AiOutlineUser }
];

interface SidebarNavProps {
  theme?: Theme;
  collapsed?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ theme = 'dark', collapsed = false }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isHovering, setIsHovering] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 flex flex-col z-50 transition-all duration-500 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center justify-between p-4 transition-all duration-300 ${
        isCollapsed ? 'px-3' : 'px-6'
      } bg-[--color-sidebar-bg] border-b border-[--color-sidebar-border]`}>
        {(!isCollapsed || isHovering) ? (
          <h1 className="text-xl font-bold text-[--color-sidebar-text] whitespace-nowrap">Nexus</h1>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[--color-primary] flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
        )}
        <div 
          onClick={toggleCollapse}
          className="p-1 rounded-full hover:bg-[--color-sidebar-hover] transition-colors cursor-pointer"
        >
          {isCollapsed ? (
            <FiChevronRight className="w-5 h-5 text-[--color-sidebar-text]" />
          ) : (
            <FiChevronLeft className="w-5 h-5 text-[--color-sidebar-text]" />
          )}
        </div>
      </div>

      {/* Sidebar Content */}
      <div className={`flex-1 flex flex-col justify-between bg-[--color-sidebar-bg] overflow-hidden transition-all duration-300 ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}>
        <ul className="space-y-2 py-4">
          {sidebarItems.map((item, idx) => (
            <li 
              key={item.label}
              className={`relative transition-all duration-200 ${
                idx === 5 ? 'mt-4 pt-4 border-t border-[--color-sidebar-border]' : ''
              }`}
            >
              <a
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                  activeItem === item.label 
                    ? 'bg-[--color-primary] text-white shadow-lg'
                    : 'hover:bg-[--color-sidebar-hover] text-[--color-sidebar-text]'
                } ${
                  isCollapsed ? 'justify-center' : 'justify-start space-x-3'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.label);
                }}
              >
                <div className="relative">
                  <item.icon 
                    className={`text-xl ${
                      activeItem === item.label 
                        ? 'text-white' 
                        : 'text-[--color-sidebar-icon]'
                    }`}
                  />
                  {item.notification && (
                    <span className={`absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${
                      activeItem === item.label
                        ? 'bg-white text-[--color-primary]'
                        : 'bg-[--color-error] text-white'
                    }`}>
                      {item.notification}
                    </span>
                  )}
                </div>
                {(!isCollapsed || isHovering) && (
                  <span className={`whitespace-nowrap transition-opacity duration-200 ${
                    isCollapsed ? 'absolute left-full ml-4 bg-white text-[--color-neutral-900] px-3 py-1 rounded-md shadow-lg z-50' : ''
                  }`}>
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div className="pb-6">
          <a
            href="#"
            className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
              isCollapsed ? 'justify-center' : 'justify-start space-x-3'
            } hover:bg-[--color-sidebar-hover] text-[--color-sidebar-text]`}
          >
            <FiLogOut className="text-xl text-[--color-error]" />
            {(!isCollapsed || isHovering) && (
              <span className={`whitespace-nowrap transition-opacity duration-200 ${
                isCollapsed ? 'absolute left-full ml-4 bg-white text-[--color-neutral-900] px-3 py-1 rounded-md shadow-lg z-50' : ''
              }`}>
                Logout
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-[--color-primary] to-[--color-secondary] opacity-20"></div>
    </div>
  );
};

export default SidebarNav;