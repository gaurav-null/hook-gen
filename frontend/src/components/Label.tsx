import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'muted' | 'badge' | 'inverted';
  size?: 'xs' | 'sm';
}

const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ className, variant = 'default', size = 'xs', children, ...props }, ref) => {
    const sizeStyles = {
      xs: 'text-xs tracking-widest',
      sm: 'text-sm tracking-wider',
    };

    const variantStyles = {
      default: 'text-[#111111] font-mono font-semibold uppercase',
      accent: 'text-[#CC0000] font-mono font-bold uppercase',
      muted: 'text-neutral-500 font-mono uppercase',
      badge: 'inline-flex items-center px-2 py-0.5 bg-[#CC0000] text-white font-mono font-bold uppercase text-[10px] tracking-widest',
      inverted: 'text-[#F9F9F7] font-mono font-semibold uppercase',
    };

    return (
      <div
        ref={ref}
        className={cn(sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Label.displayName = 'Label';

export default Label;
