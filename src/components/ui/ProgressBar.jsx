import React from 'react';

const ProgressBar = ({ progress }) => (
    <div className="progress-track" style={{ width: '100%', height: '8px', background: 'var(--bg-app)', borderRadius: '4px', overflow: 'hidden' }}>
        <div
            className="progress-fill"
            style={{
                width: `${Math.min(100, Math.max(0, progress))}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        ></div>
    </div>
);

export default ProgressBar;
