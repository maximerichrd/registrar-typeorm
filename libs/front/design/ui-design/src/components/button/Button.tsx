import type { ComponentPropsWithoutRef } from 'react';

export type ButtonHTMLProps = ComponentPropsWithoutRef<'button'>;

export const Button = ({ children, ...props }: ButtonHTMLProps) => {
  return (
    <button {...props} className="bg-blue-300">
      {children}
    </button>
  );
};
