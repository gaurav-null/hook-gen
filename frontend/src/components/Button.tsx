import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-semibold uppercase tracking-widest text-xs transition-all duration-200 ease-out disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 sharp-corners cursor-pointer select-none';

    const sizeStyles = {
      sm: 'min-h-[44px] h-10 px-4 py-2 text-xs',
      md: 'min-h-[44px] h-12 px-6 py-3 text-xs',
      lg: 'min-h-[48px] h-14 px-8 py-4 text-sm',
    };

    const variantStyles = {
      primary:
        'bg-[#111111] text-[#F9F9F7] border border-[#111111] hover:bg-white hover:text-[#111111] active:translate-y-0.5',
      secondary:
        'border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F9F9F7] active:translate-y-0.5',
      ghost:
        'bg-transparent text-[#111111] hover:bg-[#E5E5E0] border border-transparent',
      link:
        'bg-transparent text-[#111111] p-0 min-h-0 h-auto border-0 underline-offset-4 decoration-2 decoration-[#CC0000] hover:underline hover:text-[#CC0000]',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
