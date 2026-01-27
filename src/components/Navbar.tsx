import { useState } from 'react';
import { Menu, X, UtensilsCrossed, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Favorites', path: '/favourite' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-bg-glass backdrop-blur-xl border-b border-border-soft mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Kuresepi */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-bg-secondary border border-neon-green/30 rounded-lg group-hover:border-neon-green transition-all relative">
              <UtensilsCrossed size={22} className="text-neon-green" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse shadow-neon"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold tracking-tighter text-text-main">
                Ku<span className="text-neon-lime">resepi</span>
              </span>
              <span className="text-[7px] font-mono tracking-[0.3em] text-neon-green/70 uppercase">
                Digital Kitchen OS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="text-text-main hover:text-neon-green transition-colors font-montserrat tracking-wide text-sm uppercase"
              >
                {link.name}
              </button>
            ))}

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-text-muted text-sm font-mono">
                  <User size={16} />
                  <span className="truncate max-w-[150px]">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 hover:bg-white/5 rounded-full text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 border border-neon-green text-neon-green font-mono text-[10px] uppercase tracking-widest rounded hover:bg-neon-green/10 transition-all focus:outline-none focus:ring-2 focus:ring-neon-green/50"
              >
                Login Core
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-neon-green">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-bg-main/95 backdrop-blur-2xl transition-all duration-300 ${isOpen ? 'max-h-96 border-b border-border-soft' : 'max-h-0 overflow-hidden'}`}>
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { navigate(link.path); setIsOpen(false); }}
              className="text-left font-mono text-sm uppercase tracking-widest text-text-main border-l-2 border-neon-green/20 pl-4 hover:border-neon-green hover:text-neon-green transition-all"
            >
              {link.name}
            </button>
          ))}
          {user ? (
            <button
              onClick={() => { handleSignOut(); setIsOpen(false); }}
              className="text-left font-mono text-sm uppercase tracking-widest text-red-400 border-l-2 border-red-500/20 pl-4 hover:border-red-500 hover:text-red-300 transition-all"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => { navigate('/login'); setIsOpen(false); }}
              className="text-left font-mono text-sm uppercase tracking-widest text-neon-green border-l-2 border-neon-green/20 pl-4 hover:border-neon-green hover:text-neon-lime transition-all"
            >
              Login Core
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;