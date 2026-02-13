import React from 'react';
import { LayoutDashboard, BookOpen, ListTodo, Plus, Calendar } from 'lucide-react';
import ProgressBar from './ui/ProgressBar';

export default function Layout({
    children,
    activeTab,
    setActiveTab,
    progress,
    completedTasks,
    totalTasks,
    onAddClick
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>

            {/* Sidebar */}
            <aside className="glass-panel" style={{
                width: '260px',
                margin: '1rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: '1rem',
                height: 'calc(100vh - 2rem)',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '0.5rem', borderRadius: '8px' }}>
                        <BookOpen size={24} color="white" />
                    </div>
                    <h1 style={{ fontSize: '1.25rem' }}>StudyPro</h1>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
                        { id: 'tasks', icon: <ListTodo size={20} />, label: 'Tasks' },
                        { id: 'subjects', icon: <BookOpen size={20} />, label: 'Subjects' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                color: activeTab === item.id ? 'white' : 'var(--text-secondary)',
                                background: activeTab === item.id ? 'var(--primary)' : 'transparent',
                                transition: 'all 0.2s',
                                textAlign: 'left'
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <div className="card" style={{ background: 'rgba(0,0,0,0.2)', border: 'none' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Weekly Goal</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: '600' }}>{Math.round(progress)}%</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{completedTasks}/{totalTasks} Tasks</span>
                        </div>
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            </aside>

            {/* Main Layout Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <main className="container" style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Header */}
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, keep up the good work!</p>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={onAddClick}
                        >
                            <Plus size={20} />
                            Add {activeTab === 'subjects' ? 'Subject' : 'Task'}
                        </button>
                    </header>

                    {/* Content */}
                    <div className="animate-fade-in">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer style={{
                    marginTop: 'auto',
                    padding: '2rem',
                    borderTop: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    background: 'var(--bg-app)'
                }}>
                    <p>&copy; {new Date().getFullYear()} StudyPro. Built with React & Vite.</p>
                </footer>
            </div>
        </div>
    );
}
