import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type = 'text', placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs uppercase font-mono font-bold tracking-widest text-[#111111] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={cn(
            'w-full bg-transparent border-b-2 border-[#111111] h-12 px-3 py-2',
            'font-mono text-sm text-[#111111] placeholder-neutral-500',
            'focus-visible:bg-[#F0F0F0] focus-visible:outline-none transition-colors duration-200',
            'sharp-corners rounded-none',
            error && 'border-b-2 border-[#CC0000] focus-visible:bg-red-50/50',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-neutral-500 font-mono mt-1 tracking-wide">
            {hint}
          </p>
        )}
        {error && (
          <p className="text-xs text-[#CC0000] font-mono mt-1 font-semibold tracking-wide">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
