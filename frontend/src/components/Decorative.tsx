import { type ReactNode } from 'react';
import { cn } from '../lib/utils';

/**
 * 1. Dot Grid Background Texture (4x4px)
 */
export const NewsprintTexture = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-100"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23111111' fill-opacity='0.04' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
      }}
      aria-hidden="true"
    />
  );
};

/**
 * 2. Section Graph-Paper Texture Overlay
 */
export const LineGridOverlay = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none opacity-50 newsprint-texture', className)}
      aria-hidden="true"
    />
  );
};

/**
 * 3. Halftone Dot Placeholder Box
 */
export const HalftonePattern = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none halftone-bg',
        className
      )}
      aria-hidden="true"
    />
  );
};

/**
 * 4. Editorial Serif Ornaments
 */
export const Ornament = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={cn(
        'py-6 text-center font-serif text-xl md:text-2xl text-neutral-400 tracking-[1em] select-none',
        className
      )}
      aria-hidden="true"
    >
      ✦ ✦ ✦
    </div>
  );
};

/**
 * 5. Horizontal Divider Lines
 */
export interface DividerProps {
  variant?: 'thin' | 'medium' | 'heavy' | 'double';
  className?: string;
}

export const Divider = ({ variant = 'thin', className = '' }: DividerProps) => {
  if (variant === 'double') {
    return (
      <div className={cn('w-full border-t border-b-2 border-[#111111] h-[5px] my-4', className)} aria-hidden="true" />
    );
  }

  const heights = {
    thin: 'h-px',
    medium: 'h-[2px]',
    heavy: 'h-1',
  };

  return (
    <div
      className={cn('w-full bg-[#111111]', heights[variant], className)}
      aria-hidden="true"
    />
  );
};

/**
 * 6. Editorial Red Accent Divider
 */
export const AccentDivider = ({ variant = 'medium', className = '' }: DividerProps) => {
  if (variant === 'double') {
    return (
      <div className={cn('w-full border-t border-b-2 border-[#CC0000] h-[5px] my-4', className)} aria-hidden="true" />
    );
  }

  const heights = {
    thin: 'h-px',
    medium: 'h-[2px]',
    heavy: 'h-1',
  };

  return (
    <div
      className={cn('w-full bg-[#CC0000]', heights[variant], className)}
      aria-hidden="true"
    />
  );
};

/**
 * 7. Newspaper Edition Header Bar
 */
interface EditionMetadataProps {
  volume?: string;
  issue?: string;
  date?: string;
  location?: string;
  price?: string;
  className?: string;
}

export const EditionMetadata = ({
  volume = 'VOL. I',
  issue = 'NO. 42',
  date,
  location = 'GLOBAL EDITION',
  price = '$1.50',
  className = '',
}: EditionMetadataProps) => {
  const displayDate = date || new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between border-y-2 border-[#111111] py-2 px-4 font-mono text-[11px] md:text-xs uppercase tracking-widest text-neutral-600 select-none gap-2',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-bold text-[#111111]">{volume}</span>
        <span>•</span>
        <span>{issue}</span>
      </div>
      <div className="text-center font-bold text-[#111111] hidden sm:block">
        {displayDate}
      </div>
      <div className="flex items-center gap-2">
        <span>{location}</span>
        <span>•</span>
        <span className="font-bold text-[#111111]">{price}</span>
      </div>
    </div>
  );
};

/**
 * 8. Horizontal Breaking News / Stats Marquee Ticker
 */
interface MarqueeItem {
  tag: string;
  text: string;
}

interface MarqueeTickerProps {
  items: MarqueeItem[];
  className?: string;
}

export const MarqueeTicker = ({ items, className = '' }: MarqueeTickerProps) => {
  // Repeat items to ensure smooth continuous marquee loop
  const repeated = [...items, ...items, ...items];

  return (
    <div className={cn('bg-[#111111] text-[#F9F9F7] py-2.5 overflow-hidden border-y border-[#111111]', className)}>
      <div className="animate-marquee items-center gap-8 whitespace-nowrap">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="bg-[#CC0000] text-white px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase">
              {item.tag}
            </span>
            <span className="font-mono text-xs tracking-wider uppercase">
              {item.text}
            </span>
            <span className="text-neutral-500 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 9. Editorial Lead Drop Cap Paragraph
 */
export const DropCap = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('drop-cap font-body text-base lg:text-lg leading-relaxed text-[#111111]', className)}>
      {children}
    </div>
  );
};
