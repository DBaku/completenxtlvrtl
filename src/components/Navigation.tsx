import React from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ href, className, children, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80, // Offset for header
        behavior: 'smooth',
      });
    }
    
    if (onClick) onClick();
  };
  
  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};