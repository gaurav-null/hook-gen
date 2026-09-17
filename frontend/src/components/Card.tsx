import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'featured' | 'inverted';
  hardShadow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hardShadow = false, children, ...props }, ref) => {
    const baseStyles = 'bg-[#F9F9F7] text-[#111111] sharp-corners transition-all duration-200 ease-out';

    const variantStyles = {
      default: 'border border-[#111111] p-6 md:p-8',
      outlined: 'border-2 border-[#111111] p-6 md:p-8',
      featured: 'border-4 border-[#111111] p-6 md:p-8 bg-white',
      inverted: 'bg-[#111111] text-[#F9F9F7] border border-[#111111] p-6 md:p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          hardShadow && 'hard-shadow-hover',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
