import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Shirt, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navItem = (
    <>
      <NavLink to="/" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-white':'text-white/80 hover:text-white'}`}>Home</NavLink>
      <NavLink to="/dashboard" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-white':'text-white/80 hover:text-white'}`}>Dashboard</NavLink>
      <NavLink to="/wardrobe" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-white':'text-white/80 hover:text-white'}`}>Wardrobe</NavLink>
      <NavLink to="/outfits" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'text-white':'text-white/80 hover:text-white'}`}>Outfits</NavLink>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-xl mt-4 backdrop-blur-md bg-slate-900/40 border border-white/10 px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-sky-500 to-emerald-400 grid place-items-center shadow-lg">
              <Shirt className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">ClosetOS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItem}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:text-white">
                  <User className="h-4 w-4"/> Profile
                </Link>
                <button onClick={handleLogout} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-900 bg-white rounded-lg hover:bg-white/90">
                  <LogOut className="h-4 w-4"/> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:text-white">
                  <LogIn className="h-4 w-4"/> Login
                </Link>
                <Link to="/register" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-900 bg-white rounded-lg hover:bg-white/90">
                  <UserPlus className="h-4 w-4"/> Sign up
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-white/90 hover:text-white p-2" onClick={()=>setOpen(v=>!v)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:hidden">
          <div className="mt-2 rounded-xl backdrop-blur-md bg-slate-900/60 border border-white/10 px-4 py-3 space-y-2">
            <div className="flex flex-col gap-1">{navItem}</div>
            <div className="pt-2 flex gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:text-white">
                    <User className="h-4 w-4"/> Profile
                  </Link>
                  <button onClick={handleLogout} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-900 bg-white rounded-lg hover:bg-white/90">
                    <LogOut className="h-4 w-4"/> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:text-white">
                    <LogIn className="h-4 w-4"/> Login
                  </Link>
                  <Link to="/register" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-900 bg-white rounded-lg hover:bg-white/90">
                    <UserPlus className="h-4 w-4"/> Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
