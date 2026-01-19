import { useState } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Database', path: '/database' },
    { name: 'System', path: '/system' },
  ];

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
              <Link
                key={link.name}
                to={link.path}
                className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-text-muted hover:text-neon-lime transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button className="px-4 py-2 border border-neon-green text-neon-green font-mono text-[10px] uppercase tracking-widest rounded hover:bg-neon-green/10 transition-all">
              Login Core
            </button>
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
          {['Protocols', 'Database', 'System'].map((item) => (
            <Link key={item} to="/" className="font-mono text-sm uppercase tracking-widest text-text-main border-l-2 border-neon-green/20 pl-4">{item}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;