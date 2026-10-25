import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
}

export default function Button({
  onClick,
  children,
  variant = 'secondary',
  style = {},
}: ButtonProps) {
  // Définition des couleurs selon la variante
  const isPrimary = variant === 'primary';
  const bgColor = isPrimary ? '#703abb' : '#363431';
  const textColor = isPrimary ? '#ffffff' : '#c5c4c2';
  const borderColor = isPrimary ? '#552890' : '#262421';
  const shadowColor = borderColor;

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        backgroundColor: bgColor,
        color: textColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        boxShadow: `0 4px 0 ${shadowColor}`,
        transition: 'all 0.1s ease',
        userSelect: 'none',
        boxSizing: 'border-box',
        ...style,
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(2px)';
        e.currentTarget.style.boxShadow = `0 2px 0 ${shadowColor}`;
        e.currentTarget.style.borderBottom = `0px solid ${borderColor}`;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = `0 4px 0 ${shadowColor}`;
        e.currentTarget.style.borderBottom = `2px solid ${borderColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = `0 4px 0 ${shadowColor}`;
        e.currentTarget.style.borderBottom = `2px solid ${borderColor}`;
      }}
    >
      {children}
    </button>
  );
}