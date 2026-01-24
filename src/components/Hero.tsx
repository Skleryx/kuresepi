import { Search, Leaf } from 'lucide-react';
import { useState } from 'react';

const Hero = ({ onSearch }: {onSearch: (q:string) => void}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
  { id: 'western', label: 'Western', icon: '🍔' },
  { id: 'healthy', label: 'Healthy', icon: '🥗' },
  { id: 'asian', label: 'Asian', icon: '🍜' },
  { id: 'seafood', label: 'Seafood', icon: '🍤' },
  { id: 'dessert', label: 'Dessert', icon: '🍰' },
];

  const executeSearch = (query?: string) => {
  // Jika ada 'query' dari tombol, gunakan itu. Jika tidak, gunakan 'searchTerm' dari input.
  const finalQuery = typeof query === 'string' ? query : searchTerm;
  onSearch(finalQuery);
};

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-bg-main pt-20 mt-3">
      {/* Efek Cahaya Latar (Glow Backdrop) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-lime/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-glow bg-bg-secondary/50 backdrop-blur-md mb-6 animate-fade-in">
            <Leaf size={14} className="text-neon-lime" />
            <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-text-cyber">
              Future of Cooking
            </span>
          </div>

          {/* Heading Utama */}
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-text-main leading-tight mb-6">
            Temukan Resep <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-lime to-neon-teal filter drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              Digital Gastronomy
            </span>
          </h1>

          {/* Deskripsi */}
          <p className="text-text-muted font-sans text-md md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Akses ribuan basis data kuliner global dengan presisi tinggi. 
            Masak lebih cerdas dengan teknologi resep berbasis cloud.
          </p>

          {/* Search Bar Cyberpunk */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-lime rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative flex flex-col md:flex-row items-center bg-bg-secondary border border-border-soft rounded-xl overflow-hidden backdrop-blur-cyber shadow-card">
              <div className='w-full flex flex-row'>
                  <div className="pl-5 text-text-muted item-center justify-center content-center">
                    <Search size={20} />
                  </div>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' && executeSearch()}
                    type="text"
                    placeholder="Cari kode resep (contoh: Chicken, Pasta, Seafood)..."
                    className="w-full bg-transparent border-none py-5 px-4 text-text-main focus:ring-0 outline-none font-sans placeholder:text-text-muted/50"
                  />
              </div>
              <button 
              onClick={() => executeSearch()}
              className="relative bg-neon-green hover:bg-neon-lime text-bg-main font-montserrat font-bold px-8 py-5 transition-cyber-ease uppercase tracking-wider text-sm rounded-xl w-full md:w-1/6">
                Cari
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSearchTerm(cat.id); // Update teks di input
                executeSearch(cat.id); // Langsung cari
              }}
              className="group relative px-4 py-2 bg-bg-secondary/40 border border-border-soft rounded-full hover:border-neon-green transition-all duration-300"
            >
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-tighter text-text-muted group-hover:text-neon-green">
                <span className="opacity-70">{cat.icon}</span>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

          {/* Statistik Singkat */}
          <div className="flex flex-col md:flex-row justify-center gap-8 mt-16 border-t border-border-soft/50 pt-8">
            <div className="text-center">
              <p className="text-neon-lime text-3xl font-bold">5000+</p>
              <p className="text-[12px] text-text-muted uppercase tracking-widest mt-1">Protocols</p>
            </div>
            <div className="text-center">
              <p className="text-neon-lime text-3xl font-bold">200+</p>
              <p className="text-[12px] text-text-muted uppercase tracking-widest mt-1">Regions</p>
            </div>
            <div className="text-center">
              <p className="text-neon-lime text-3xl font-bold">24/7</p>
              <p className="text-[12px] text-text-muted uppercase tracking-widest mt-1">Update</p>
            </div>
          </div>

        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
    </section>
  );
};

export default Hero;