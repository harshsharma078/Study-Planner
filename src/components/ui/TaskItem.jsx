import React from 'react';
import { CheckCircle2, Circle, Trash2, Edit2, Calendar } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const TaskItem = ({ task, subject, onToggle, onDelete, onEdit }) => {
    return (
        <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <button
                    onClick={() => onToggle(task.id)}
                    style={{
                        color: task.completed ? 'var(--success)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                    }}
                >
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                <div style={{ opacity: task.completed ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                    <h4 style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        fontSize: '1rem',
                        marginBottom: '0.25rem'
                    }}>
                        {task.title}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {subject && (
                            <span className="badge" style={{
                                background: `${subject.color}22`,
                                color: subject.color,
                                border: `1px solid ${subject.color}44`
                            }}>
                                {subject.name}
                            </span>
                        )}
                        {task.deadline && (
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Calendar size={14} />
                                {new Date(task.deadline).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="ghost" onClick={() => onEdit(task)} style={{ color: 'var(--text-secondary)', padding: '0.5rem' }}>
                    <Edit2 size={18} />
                </Button>
                <Button variant="ghost" onClick={() => onDelete(task.id)} style={{ color: 'var(--danger)', opacity: 0.7, padding: '0.5rem' }}>
                    <Trash2 size={18} />
                </Button>
            </div>
        </Card>
    );
};

export default TaskItem;
