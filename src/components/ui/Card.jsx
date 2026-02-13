import React from 'react';

const Card = ({ children, className = '', style = {}, hover = false, ...props }) => {
    const baseStyle = {
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.5rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        ...style
    };

    const hoverStyle = hover ? {
        cursor: 'pointer',
        ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }
    } : {};

    return (
        <div className={`card ${className}`} style={baseStyle} {...props}>
            {children}
        </div>
    );
};

export default Card;
