import React from 'react';

export const permissions = [
  { id: '1', name: 'read:users', description: 'View user information' },
  { id: '2', name: 'write:users', description: 'Create and edit users' },
  { id: '3', name: 'delete:users', description: 'Delete users' },
  { id: '4', name: 'manage:roles', description: 'Manage roles and permissions' },
];

export const roles = [
  {
    id: '1',
    name: 'Admin',
    permissions: permissions,
    description: 'Full system access',
  },
  {
    id: '2',
    name: 'Editor',
    permissions: [permissions[0], permissions[1]],
    description: 'Can view and edit users',
  },
  {
    id: '3',
    name: 'Viewer',
    permissions: [permissions[0]],
    description: 'Read-only access',
  },
];

export const users = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: roles[0],
    status: 'active',
    lastLogin: '2024-03-10T15:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael.r@example.com',
    role: roles[1],
    status: 'active',
    lastLogin: '2024-03-09T10:15:00Z',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Alex Thompson',
    email: 'alex.t@example.com',
    role: roles[2],
    status: 'inactive',
    lastLogin: '2024-03-01T08:45:00Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];
