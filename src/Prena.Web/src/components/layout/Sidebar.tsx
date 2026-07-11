import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  RiDashboardLine, RiFileTextLine, RiUserLine, RiSettingsLine, 
  RiShoppingCartLine, RiArchiveLine, RiTeamLine, RiProfileLine,
  RiArrowDownSLine, RiArrowUpSLine, RiBankLine, RiMoneyDollarCircleLine,
  RiBuilding2Line, RiBarChart2Line, RiShieldKeyholeLine,
  RiCustomerService2Line, RiAppsLine
} from 'react-icons/ri';

interface Props { isOpen: boolean; onToggle: () => void; }

interface MenuItem {
  path?: string;
  icon: React.ReactNode;
  label: string;
  children?: { path: string; icon: React.ReactNode; label: string }[];
}

const menuItems: MenuItem[] = [
  { path: '/dashboard', icon: <RiDashboardLine size={20} />, label: '???????' },
  { 
    icon: <RiFileTextLine size={20} />, label: '????????',
    children: [
      { path: '/accounting', icon: <RiFileTextLine size={16} />, label: '????? ????????' },
      { path: '/accounting/reports', icon: <RiBarChart2Line size={16} />, label: '??????? ????' },
    ]
  },
  { 
    icon: <RiBankLine size={20} />, label: '????? ????',
    children: [
      { path: '/treasury', icon: <RiMoneyDollarCircleLine size={16} />, label: '?????? ? ??????' },
      { path: '/treasury/cheques', icon: <RiFileTextLine size={16} />, label: '?????? ??' },
    ]
  },
  { path: '/inventory', icon: <RiArchiveLine size={20} />, label: '?????????' },
  { path: '/sales', icon: <RiShoppingCartLine size={20} />, label: '????' },
  { path: '/users', icon: <RiUserLine size={20} />, label: '???????' },
  { path: '/roles', icon: <RiTeamLine size={20} />, label: '??? ??' },
  { 
    icon: <RiShieldKeyholeLine size={20} />, 
    label: '?????? ?????',
    children: [
      { path: '/admin/dashboard', icon: <RiDashboardLine size={16} />, label: '??????? ??????' },
      { path: '/admin/companies', icon: <RiBuilding2Line size={16} />, label: '???? ??' },
      { path: '/admin/modules', icon: <RiAppsLine size={16} />, label: '????? ??' },
      { path: '/admin/agents', icon: <RiCustomerService2Line size={16} />, label: '??????? ??' },
    ]
  },
  { path: '/profile', icon: <RiProfileLine size={20} />, label: '???????' },
  { path: '/settings', icon: <RiSettingsLine size={20} />, label: '???????' },
];

export const Sidebar: React.FC<Props> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(m => m !== label)
        : [...prev, label]
    );
  };

  const isSubmenuActive = (children: { path: string }[]) => {
    return children.some(child => location.pathname === child.path);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" 
          style={{ zIndex: 999 }} 
          onClick={onToggle} 
        />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo d-flex justify-content-between align-items-center">
          <NavLink to="/dashboard" className="text-decoration-none text-white">
            <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
              <span style={{ 
                background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
                borderRadius: '10px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                P
              </span>
              Prena
            </h4>
          </NavLink>
          <button className="btn btn-link text-white d-md-none p-0" onClick={onToggle}>X</button>
        </div>

        <nav className="mt-3 px-2">
          {menuItems.map((item, index) => {
            if (item.children) {
              const isExpanded = expandedMenus.includes(item.label);
              const isActive = isSubmenuActive(item.children);
              
              return (
                <div key={index} className="mb-1">
                  <button
                    className="btn w-100 d-flex align-items-center justify-content-between text-white border-0 px-3 py-2"
                    style={{ 
                      background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                      borderRadius: '8px',
                      fontWeight: 400,
                      fontSize: '0.9rem'
                    }}
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    <span className="d-flex align-items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                    {isExpanded ? <RiArrowUpSLine size={16} /> : <RiArrowDownSLine size={16} />}
                  </button>
                  
                  {isExpanded && (
                    <div className="ms-3 mt-1">
                      {item.children.map((child, childIndex) => (
                        <NavLink
                          key={childIndex}
                          to={child.path}
                          className={({ isActive }) => 
                            `nav-link d-flex align-items-center gap-2 py-2 px-3 ${isActive ? 'active' : ''}`
                          }
                          style={{ 
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            marginBottom: '2px'
                          }}
                          onClick={() => { if (window.innerWidth < 768) onToggle(); }}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <NavLink
                key={index}
                to={item.path!}
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center gap-2 px-3 py-2 mb-1 ${isActive ? 'active' : ''}`
                }
                style={{ 
                  borderRadius: '8px',
                  fontWeight: 400,
                  fontSize: '0.9rem'
                }}
                onClick={() => { if (window.innerWidth < 768) onToggle(); }}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 mt-auto position-absolute bottom-0 start-0 end-0 pb-3">
          <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.08)', fontSize: '0.75rem' }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="rounded-circle bg-success" style={{ width: 8, height: 8 }} />
              <span>???? ????</span>
            </div>
            <div className="text-white-50">???? ?.?.?</div>
          </div>
        </div>
      </aside>
    </>
  );
};
