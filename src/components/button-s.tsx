import React from 'react';

interface ButtonSProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ButtonS({ children, className = '', ...props }: ButtonSProps) {
  return (
    <button 
      type="button" 
      className={`btn-saifu ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
