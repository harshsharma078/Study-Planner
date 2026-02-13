import React from 'react';
import Card from './Card';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.6)', // Darker overlay
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={onClose}
        >
            <Card
                style={{ width: '400px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}
                onClick={e => e.stopPropagation()}
            >
                {title && <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>{title}</h3>}
                {children}
            </Card>
        </div>
    );
};

export default Modal;
