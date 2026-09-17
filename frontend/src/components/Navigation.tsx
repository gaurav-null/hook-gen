import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export interface NavigationProps {
  portfolioUrl?: string;
  className?: string;
}

export default function Navigation({
  portfolioUrl = 'https://gaurav-nile.nya.je/',
  className = '',
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav aria-label="Main Navigation" className={cn('relative', className)}>
      {/* Compact Hamburger Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group h-8 px-2.5 py-1 bg-[#F9F9F7] text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#F9F9F7] transition-all duration-200 sharp-corners flex items-center gap-1.5 font-mono text-[11px] uppercase font-bold tracking-wider cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
        aria-expanded={isOpen}
        aria-controls="newspaper-sidebar-menu"
        aria-label={isOpen ? 'Close publication menu' : 'Open publication menu'}
      >
        {isOpen ? (
          <X className="w-4 h-4 stroke-[2]" />
        ) : (
          <Menu className="w-4 h-4 stroke-[2]" />
        )}
        <span>Menu</span>
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[#111111]/60 backdrop-blur-[1px] z-40 transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Slide-out Newsprint Drawer */}
      <aside
        id="newspaper-sidebar-menu"
        className={cn(
          'fixed top-0 left-0 h-full w-full max-w-sm sm:max-w-md bg-[#F9F9F7] border-r-4 border-[#111111] z-50 transform transition-transform duration-200 ease-out sharp-corners flex flex-col justify-between shadow-2xl overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Publication Directory"
      >
        {/* Drawer Header */}
        <div className="p-6 md:p-8 border-b-2 border-[#111111] bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-[#CC0000] text-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase">
              Directory
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-1.5 text-[#111111] hover:text-[#CC0000] border border-[#111111] hover:border-[#CC0000] transition-colors sharp-corners flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="font-serif text-3xl font-black tracking-tight text-[#111111]">
            Table of Contents
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mt-1">
            Vol. IV • Special Gazette
          </p>
        </div>

        {/* Directory Items */}
        <div className="p-6 md:p-8 flex-1 space-y-4">
          {/* Primary Featured Link: User Portfolio */}
          <div className="border-2 border-[#111111] bg-white p-5 hover:bg-neutral-100 transition-colors group hard-shadow-hover">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#CC0000]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#CC0000]">
                    Official Portfolio
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#111111] group-hover:underline decoration-2 decoration-[#CC0000]">
                gaurav-nile.nya.je
              </h3>
              <p className="font-body text-xs text-neutral-600 mt-2 leading-relaxed">
                Explore engineering archives, full-stack systems, algorithmic workflows, and design systems.
              </p>
            </a>
          </div>

          {/* Quick Page Sections */}
          <div className="space-y-2 pt-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 block mb-2">
              On This Page
            </span>

            <a
              href="#generator"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-3 border border-[#111111] bg-[#F9F9F7] hover:bg-[#111111] hover:text-[#F9F9F7] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#CC0000] group-hover:text-white" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider">
                  Viral Hook Terminal
                </span>
              </div>
              <span className="font-mono text-xs">01</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t-2 border-[#111111] bg-white font-mono text-xs text-neutral-600">
          <div className="flex justify-between items-center">
            <span>PRINTED IN NYC</span>
            <span className="font-bold text-[#111111]">EDITION 4.0</span>
          </div>
        </div>
      </aside>
    </nav>
  );
}
