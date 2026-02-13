import React, { useState } from 'react';
import {
    CheckCircle2,
    Circle,
    Clock,
    BookOpen,
    Calendar,
    Trash2,
    Edit2,
    ChevronDown,
    ChevronUp,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import './style.css';
import Layout from './components/Layout';
import ProgressBar from './components/ui/ProgressBar';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Input, { Select } from './components/ui/Input';
import Modal from './components/ui/Modal';
import TaskItem from './components/ui/TaskItem';

// --- Local Storage Hooks ---
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};

// --- Components ---

const StatCard = ({ title, value, icon, gradient }) => (
    <Card style={{ background: gradient ? `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` : undefined, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{title}</h3>
            <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--text-primary)'
            }}>
                {icon}
            </div>
        </div>
        <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)' }}>{value}</p>
    </Card>
);

const OverallProgressSummary = ({ total, completed }) => {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <Card style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', width: '100%', textAlign: 'left' }}>Overall Progress</h3>
            <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="var(--bg-app)"
                        strokeWidth="8"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="var(--primary)"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                    />
                </svg>
                <span style={{ position: 'absolute', fontSize: '1.25rem', fontWeight: 'bold' }}>{percentage}%</span>
            </div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{completed}</span> / {total} Tasks Completed
            </p>
        </Card>
    );
};

const SubjectProgressList = ({ subjects, tasks }) => {
    return (
        <Card style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <TrendingUp size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Subject Performance</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {subjects.map(subject => {
                    const subjectTasks = tasks.filter(t => t.subjectId === subject.id);
                    const completed = subjectTasks.filter(t => t.completed).length;
                    const total = subjectTasks.length;
                    const subProgress = total === 0 ? 0 : Math.round((completed / total) * 100);

                    return (
                        <div key={subject.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                                <span style={{ fontWeight: '500' }}>{subject.name}</span>
                                <span style={{ color: 'var(--text-secondary)' }}>{subProgress}%</span>
                            </div>
                            <div style={{ height: '6px', background: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${subProgress}%`,
                                    height: '100%',
                                    background: subject.color,
                                    borderRadius: '3px',
                                    transition: 'width 0.5s ease-out'
                                }}></div>
                            </div>
                        </div>
                    );
                })}
                {subjects.length === 0 && <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No subjects added yet.</p>}
            </div>
        </Card>
    );
};

const SubjectCard = ({ subject, tasks, onEdit, onDelete, onEditTask, onDeleteTask, onToggleTask }) => {
    const [expanded, setExpanded] = useState(false);

    const subjectTasks = tasks.filter(t => t.subjectId === subject.id);
    const completed = subjectTasks.filter(t => t.completed).length;
    const total = subjectTasks.length;
    const subProgress = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <Card style={{ borderTop: `4px solid ${subject.color}`, transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>{subject.name}</h3>
                    {expanded ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
                </div>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <Button variant="ghost" onClick={() => onEdit(subject)} style={{ color: 'var(--text-secondary)', padding: '0.25rem' }}>
                        <Edit2 size={18} />
                    </Button>
                    <Button variant="ghost" onClick={() => onDelete(subject.id)} style={{ color: 'var(--text-secondary)', padding: '0.25rem' }}>
                        <Trash2 size={18} />
                    </Button>
                </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    <span>Progress</span>
                    <span>{subProgress}%</span>
                </div>
                <ProgressBar progress={subProgress} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{total - completed} tasks remaining</p>

            {expanded && (
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Tasks</h4>
                    {subjectTasks.length === 0 ? (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>No tasks yet.</p>
                    ) : (
                        subjectTasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                subject={subject}
                                onToggle={onToggleTask}
                                onDelete={onDeleteTask}
                                onEdit={onEditTask}
                            />
                        ))
                    )}
                </div>
            )}
        </Card>
    );
};

// --- Main App ---

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [subjects, setSubjects] = useLocalStorage('subjects', [
        { id: 1, name: 'Mathematics', color: '#a78bfa' }, // Pastel Violet
        { id: 2, name: 'Physics', color: '#f472b6' }, // Pastel Pink
        { id: 3, name: 'Computer Science', color: '#67e8f9' } // Pastel Cyan
    ]);
    const [tasks, setTasks] = useLocalStorage('tasks', [
        { id: 1, subjectId: 1, title: 'Calculus Assignment', deadline: '2024-03-20', completed: false },
        { id: 2, subjectId: 3, title: 'React Project', deadline: '2024-03-25', completed: true },
        { id: 3, subjectId: 1, title: 'Linear Algebra Quiz', deadline: new Date().toISOString().split('T')[0], completed: false },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('task'); // 'task' or 'subject'
    const [editingId, setEditingId] = useState(null);
    const [newItem, setNewItem] = useState({ title: '', subjectId: '', deadline: '', name: '', color: '#a78bfa' });

    // Stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const handleSaveTask = (e) => {
        e.preventDefault();
        if (!newItem.title || !newItem.subjectId) return;

        if (editingId) {
            setTasks(tasks.map(t => t.id === editingId ? {
                ...t,
                title: newItem.title,
                subjectId: parseInt(newItem.subjectId),
                deadline: newItem.deadline
            } : t));
        } else {
            setTasks([...tasks, {
                id: Date.now(),
                title: newItem.title,
                subjectId: parseInt(newItem.subjectId),
                deadline: newItem.deadline,
                completed: false
            }]);
        }
        closeModal();
    };

    const handleSaveSubject = (e) => {
        e.preventDefault();
        if (!newItem.name) return;

        if (editingId) {
            setSubjects(subjects.map(s => s.id === editingId ? { ...s, name: newItem.name, color: newItem.color } : s));
        } else {
            setSubjects([...subjects, { id: Date.now(), name: newItem.name, color: newItem.color }]);
        }
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setNewItem({ title: '', subjectId: '', deadline: '', name: '', color: '#a78bfa' });
    };

    const openEditSubject = (subject) => {
        setModalType('subject');
        setEditingId(subject.id);
        setNewItem({ ...newItem, name: subject.name, color: subject.color });
        setIsModalOpen(true);
    };

    const openEditTask = (task) => {
        setModalType('task');
        setEditingId(task.id);
        setNewItem({
            title: task.title,
            subjectId: task.subjectId,
            deadline: task.deadline || '',
            name: '',
            color: '#a78bfa'
        });
        setIsModalOpen(true);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const deleteSubject = (id) => {
        setSubjects(subjects.filter(s => s.id !== id));
        setTasks(tasks.filter(t => t.subjectId !== id)); // Cascade delete
    };

    return (
        <Layout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            progress={progress}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            onAddClick={() => { setIsModalOpen(true); setModalType(activeTab === 'subjects' ? 'subject' : 'task'); }}
        >
            {activeTab === 'dashboard' && (
                <div className="grid-dashboard">
                    <OverallProgressSummary total={totalTasks} completed={completedTasks} />
                    <StatCard
                        title="Pending Tasks"
                        value={totalTasks - completedTasks}
                        icon={<Clock />}
                    />
                    <StatCard
                        title="Completed"
                        value={completedTasks}
                        icon={<CheckCircle2 />}
                    />
                    <StatCard
                        title="Total Subjects"
                        value={subjects.length}
                        icon={<BookOpen />}
                    />
                    <div style={{ gridColumn: 'span 4', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        <Card>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <AlertCircle size={20} color="var(--primary)" />
                                <h3 style={{ fontSize: '1.25rem' }}>Upcoming Deadlines</h3>
                            </div>
                            {tasks.filter(t => !t.completed).length === 0 ? (
                                <p style={{ color: 'var(--text-secondary)' }}>No upcoming deadlines. Great job!</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {tasks
                                        .filter(t => !t.completed)
                                        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                                        .slice(0, 3)
                                        .map(task => {
                                            const subject = subjects.find(s => s.id === task.subjectId);
                                            const today = new Date().toISOString().split('T')[0];
                                            const isDueToday = task.deadline === today;

                                            return (
                                                <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-app)', borderRadius: '12px', border: isDueToday ? '1px solid var(--danger)' : 'none' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: subject?.color || 'var(--text-secondary)' }}></div>
                                                        <div>
                                                            <h4 style={{ fontSize: '1rem' }}>{task.title}</h4>
                                                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{subject?.name}</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isDueToday ? 'var(--danger)' : 'var(--text-secondary)' }}>
                                                        <Calendar size={16} />
                                                        <span style={{ fontSize: '0.875rem', fontWeight: isDueToday ? 'bold' : 'normal' }}>
                                                            {isDueToday ? 'Today' : task.deadline}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </Card>
                        <SubjectProgressList subjects={subjects} tasks={tasks} />
                    </div>
                </div>
            )}

            {activeTab === 'tasks' && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {tasks.map(task => {
                        const subject = subjects.find(s => s.id === task.subjectId);
                        return (
                            <TaskItem
                                key={task.id}
                                task={task}
                                subject={subject}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                                onEdit={openEditTask}
                            />
                        );
                    })}
                    {tasks.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>No tasks found. Add one to get started!</p>}
                </div>
            )}

            {activeTab === 'subjects' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                    {subjects.map(subject => (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            tasks={tasks}
                            onEdit={openEditSubject}
                            onDelete={deleteSubject}
                            onEditTask={openEditTask}
                            onDeleteTask={deleteTask}
                            onToggleTask={toggleTask}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={`${editingId ? 'Edit' : 'Add New'} ${modalType === 'task' ? 'Task' : 'Subject'}`}
            >
                <form onSubmit={modalType === 'task' ? handleSaveTask : handleSaveSubject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {modalType === 'task' ? (
                        <>
                            <Input
                                placeholder="Task Title"
                                value={newItem.title}
                                onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                                autoFocus
                            />
                            <Select
                                value={newItem.subjectId}
                                onChange={e => setNewItem({ ...newItem, subjectId: e.target.value })}
                                options={subjects.map(s => ({ value: s.id, label: s.name }))}
                                placeholder="Select Subject"
                            />
                            <Input
                                type="date"
                                value={newItem.deadline}
                                onChange={e => setNewItem({ ...newItem, deadline: e.target.value })}
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                placeholder="Subject Name"
                                value={newItem.name}
                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                autoFocus
                            />
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {['#a78bfa', '#f472b6', '#67e8f9', '#34d399', '#fbbf24', '#f87171'].map(c => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setNewItem({ ...newItem, color: c })}
                                        style={{
                                            width: '32px', height: '32px', borderRadius: '50%', background: c,
                                            border: newItem.color === c ? '2px solid white' : 'none',
                                            boxShadow: newItem.color === c ? '0 0 0 2px var(--primary)' : 'none',
                                            cursor: 'pointer'
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                        <Button type="submit" variant="primary">{editingId ? 'Save Changes' : `Create ${modalType === 'task' ? 'Task' : 'Subject'}`}</Button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
}
