import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {label && <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input"
                style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                }}
                {...props}
            />
        </div>
    );
};

export const Select = ({ label, value, onChange, options, placeholder, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {label && <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className="input"
                style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    outline: 'none',
                    cursor: 'pointer'
                }}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Input;
