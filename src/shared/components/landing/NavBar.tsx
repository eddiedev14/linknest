import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoMenuSharp } from 'react-icons/io5';
import { navMenuItems } from '@/data/landing.data';
import Logo from '@/assets/logo.png';

export default function Navbar() {
  //* States
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img src={Logo} alt="Linknest Logo" className="size-8" />
          <span className="font-heading font-bold text-lg text-foreground tracking-tight">
            Link <span className="text-primary">Nest</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navMenuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Log in
          </a>
          <a
            href="/signup"
            className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            Get started free
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <IoMdClose /> : <IoMenuSharp />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 pb-6 pt-4 flex flex-col gap-4 shadow-lg">
          {navMenuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <hr className="border-border" />
          <a href="/login" className="text-sm font-medium text-muted-foreground">
            Log in
          </a>
          <a
            href="/signup"
            className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2.5 rounded-full text-center hover:bg-primary/90 transition-colors"
          >
            Get started free
          </a>
        </div>
      )}
    </header>
  );
}
