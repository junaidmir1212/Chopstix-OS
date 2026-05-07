"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRobot, faGraduationCap, faTrash, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); 
  const [userName, setUserName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [usernameInput, setUsernameInput] = useState(""); 
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  
  // Sidebar toggle state for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const theme = { sidebarBg: '#1A1D23', primaryRed: '#E31837', bgLight: '#F5F6F8', textDark: '#1E232B', textMuted: '#6B7280', white: '#FFFFFF', border: '#E5E7EB', danger: '#EF4444' };

  const USERS = [
    { id: "Junaid", pass: "Chopstix2026", name: "Muhammad Junaid Mir", role: "manager", branch: "Oxford Street (London)" },
    { id: "Manager_Manc", pass: "Manc2026", name: "Liam Gallagher", role: "manager", branch: "Manchester Arndale" },
    { id: "Manager_Brum", pass: "Brum2026", name: "Sarah Smith", role: "manager", branch: "Birmingham Bullring" },
    { id: "AreaAdmin", pass: "ChopstixGlobal", name: "Area Director", role: "area_manager", branch: "All Branches (UK)" }
  ];

  useEffect(() => {
    const savedAuth = localStorage.getItem("chopstix_logged_in");
    if (savedAuth === "true") {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem("chopstix_role") || "");
      setUserName(localStorage.getItem("chopstix_user_name") || "");
      setSelectedBranch(localStorage.getItem("selected_branch") || "");
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = USERS.find(u => u.id === usernameInput && u.pass === passwordInput);
    if (user) {
      localStorage.setItem("chopstix_logged_in", "true");
      localStorage.setItem("chopstix_role", user.role);
      localStorage.setItem("chopstix_user_name", user.name);
      localStorage.setItem("selected_branch", user.branch);
      setIsLoggedIn(true);
      setUserRole(user.role);
      setUserName(user.name);
      setSelectedBranch(user.branch);
      window.dispatchEvent(new Event('storage'));
    } else {
      setError("Invalid credentials.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/");
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    const parts = name.split(" ");
    return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
  };

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: theme.bgLight }}>
        {!isChecking && (
          <>
            {!isLoggedIn ? (
              <div style={{ 
                width: '100vw', 
                height: '100vh', 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'fixed', 
                zIndex: 9999 
              }}>
                <div style={{ backgroundColor: 'white', padding: '50px 40px', borderRadius: '24px', width: '380px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                  <h2 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 30px 0', letterSpacing: '-1px' }}>CHOPSTI<span style={{color: theme.primaryRed}}>X</span></h2>
                  <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <input 
                      type="text" 
                      onChange={(e) => setUsernameInput(e.target.value)} 
                      style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}`, marginBottom: '20px', boxSizing: 'border-box' }} 
                      placeholder="Username" 
                    />
                    <input 
                      type="password" 
                      onChange={(e) => setPasswordInput(e.target.value)} 
                      style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}`, marginBottom: '20px', boxSizing: 'border-box' }} 
                      placeholder="Password" 
                    />
                    <button 
                      type="submit" 
                      style={{ width: '100%', padding: '16px', backgroundColor: theme.primaryRed, color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}
                    >
                      Sign In
                    </button>
                    {error && <p style={{color: theme.danger, fontSize: '14px', marginTop: '15px', fontWeight: '600'}}>{error}</p>}
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* 🍔 MOBILE HAMBURGER BUTTON */}
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="mobile-toggle"
                  style={{ position: 'fixed', top: '15px', left: '15px', zIndex: 1001, backgroundColor: theme.primaryRed, color: 'white', border: 'none', borderRadius: '8px', width: '40px', height: '40px', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center' }}
                >
                  <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
                </button>

                {/* 🔳 MOBILE OVERLAY */}
                {isSidebarOpen && (
                  <div onClick={() => setIsSidebarOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999, backdropFilter: 'blur(2px)' }} />
                )}

                {/* 🚪 SIDEBAR */}
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ width: '250px', backgroundColor: theme.sidebarBg, color: theme.white, position: 'fixed', height: '100vh', zIndex: 1000, transition: 'transform 0.3s ease' }}>
                  <div style={{ padding: '30px 24px' }}><h2 style={{ margin: 0, fontSize: '22px' }}>CHOPSTI<span style={{color: theme.primaryRed}}>X</span></h2></div>
                  <nav style={{ padding: '15px 0' }}>
                    {[{ name: 'Dashboard', path: '/', icon: faHome }, { name: 'AI Reviews', path: '/feedback', icon: faRobot }, { name: 'Training', path: '/training', icon: faGraduationCap }, { name: 'Wastage Log', path: '/waste', icon: faTrash }].map((item) => (
                      <a key={item.name} href={item.path} onClick={() => setIsSidebarOpen(false)} style={{ display: 'flex', alignItems: 'center', padding: '14px 24px', textDecoration: 'none', color: pathname === item.path ? theme.white : '#A0AEC0', backgroundColor: pathname === item.path ? theme.primaryRed : 'transparent' }}>
                        <FontAwesomeIcon icon={item.icon} style={{ width: '18px', marginRight: '15px' }} /> {item.name}
                      </a>
                    ))}
                  </nav>
                  <button onClick={handleLogout} style={{ position: 'absolute', bottom: '20px', left: '24px', background: 'none', border: 'none', color: '#A0AEC0', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '10px'}}/> Log Out
                  </button>
                </div>

                {/* 🖥️ MAIN CONTENT AREA */}
                <div className="main-content" style={{ flex: 1, transition: 'margin 0.3s ease' }}>
                  <header style={{ height: '70px', backgroundColor: theme.white, borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
                    <div className="header-branch-title">
                      {userRole === "area_manager" ? (
                        <select value={selectedBranch} onChange={(e) => { setSelectedBranch(e.target.value); localStorage.setItem("selected_branch", e.target.value); window.dispatchEvent(new Event('storage')); }} style={{ border: 'none', fontWeight: '700', fontSize: '16px', outline: 'none' }}>
                          <option>All Branches (UK)</option><option>Oxford Street (London)</option><option>Manchester Arndale</option><option>Birmingham Bullring</option>
                        </select>
                      ) : <div style={{fontWeight: '700'}}>{selectedBranch}</div>}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div className="header-user-info" style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>{userName}</div>
                        <div style={{ fontSize: '12px', color: theme.textMuted }}>{userRole === "area_manager" ? "Area Director" : "Branch Manager"}</div>
                      </div>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.primaryRed, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>{getInitials(userName)}</div>
                    </div>
                  </header>
                  <main style={{ padding: '40px' }}>{children}</main>
                </div>

                <style>{`
                  @media (max-width: 1024px) {
                    .sidebar { transform: translateX(-100%); }
                    .sidebar.open { transform: translateX(0); }
                    .main-content { margin-left: 0 !important; }
                    .mobile-toggle { display: flex !important; }
                    .header-user-info { display: none; }
                    header { padding: 0 20px 0 70px !important; }
                  }
                  @media (min-width: 1025px) {
                    .main-content { margin-left: 250px !important; }
                    .sidebar { transform: translateX(0) !important; }
                  }
                `}</style>
              </>
            )}
          </>
        )}
      </body>
    </html>
  );
}