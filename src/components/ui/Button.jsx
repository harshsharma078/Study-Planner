import React from 'react';

const Button = ({ children, variant = 'primary', onClick, type = 'button', className = '', ...props }) => {
    const baseStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '12px',
        fontWeight: '500',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: 'none',
        fontFamily: 'inherit',
        fontSize: '0.95rem'
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, #a78bfa, #f472b6)', // Pastel Violet/Pink
            color: 'white',
            boxShadow: '0 4px 12px rgba(167, 139, 250, 0.3)',
        },
        secondary: {
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
        },
        danger: {
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171', // Pastel Red
        },
        ghost: {
            background: 'transparent',
            color: 'var(--text-secondary)',
            padding: '0.5rem'
        }
    };

    return (
        <button
            type={type}
            style={{ ...baseStyle, ...variants[variant] }}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
