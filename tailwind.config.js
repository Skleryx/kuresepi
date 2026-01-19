/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Basis Hijau Gelap & Deep Forest (Ganti dari Slate ke Emerald/Zinc Dark)
        bg: {
          main: "#022c22",       // Emerald 950 - Background hutan yang sangat dalam
          secondary: "#064e3b",  // Emerald 900 - Untuk card agar terlihat terangkat
          glass: "rgba(2, 44, 34, 0.7)", // Efek kaca hijau gelap
        },
        // Aksen Neon Hijau (Ganti dari Cyan ke Lime/Emerald Neon)
        neon: {
          green: "#10b981",      // Emerald elektrik
          lime: "#adff2f",       // Lime terang untuk highlight utama
          teal: "#2dd4bf",       // Teal untuk variasi gradient
        },
        // Warna Brand/Tombol Utama
        primary: {
          DEFAULT: "#059669",    // Hijau utama
          soft: "#10b981",       // Hijau hover
        },
        // Sistem Tipografi
        text: {
          main: "#f0fdf4",       // Putih kehijauan bersih
          muted: "#94a3b8",      // Tetap gunakan slate/gray untuk readability
          cyber: "#adff2f",      // Warna lime untuk teks yang ditekankan
        },
        // Garis Pembatas (Border)
        border: {
          glow: "#065f46",       // Hijau gelap untuk border menyala halus
          soft: "#064e3b",       // Border standar
        },
      },
      // Shadow yang sinkron dengan warna neon hijau
      boxShadow: {
        neon: "0 0 20px rgba(16, 185, 129, 0.25)",      // Glow emerald halus
        neonStrong: "0 0 35px rgba(173, 255, 47, 0.4)", // Glow lime kuat
        card: "0 15px 50px rgba(0, 0, 0, 0.7)",        
      },
      // Sisanya (backdropBlur, transition, font) tetap sama seperti filemu
      backdropBlur: {
        cyber: "16px",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

